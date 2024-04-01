package com.pay.pie.domain.pay.application;

import static com.pay.pie.domain.order.entity.QOrder.*;
import static com.pay.pie.domain.orderMenu.entity.QOrderMenu.*;
import static com.pay.pie.domain.participant.entity.QParticipant.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.account.entity.QAccount;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.notification.dto.EventMessage;
import com.pay.pie.domain.notification.service.SseEmitterService;
import com.pay.pie.domain.order.dto.OrderDto;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.order.entity.QOrder;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.dto.ParticipantInfoDto;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.dto.response.CompletedPaymentRes;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.domain.pay.entity.QPay;
import com.pay.pie.domain.payInstead.entity.PayInstead;
import com.pay.pie.domain.payInstead.entity.QPayInstead;
import com.pay.pie.global.util.PiePayUtil;
import com.pay.pie.global.util.bank.BankUtil;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService {

	private final PayRepository payRepository;
	private final MeetRepository meetRepository;
	private final ParticipantRepository participantRepository;
	private final JPAQueryFactory queryFactory;
	private final SseEmitterService sseEmitterService;
	private final BankUtil bankUtil;
	private final PiePayUtil piePayUtil;

	public List<Pay> findPayByMeetId(long meetId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));
		return payRepository.findByMeetOrderByCreatedAtDesc(meet);
	}

	public Pay findRecentPayByMeetId(long meetId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));

		return payRepository.findFirstByMeetOrderByCreatedAtDesc(meet);
	}

	@Override
	@Transactional
	public CompletedPaymentRes processPayment(Long payId) {
		//참여자 정보
		List<Participant> participantList = payRepository.findParticipantsByPayId(payId);
		log.info("참여자들: {}", participantList);

		// 결제 테이블에 가게정보, 영수증 정보 저장
		Order order = queryFactory.selectFrom(QOrder.order)
			.where(QOrder.order.pay.id.eq(payId))
			.fetchOne();
		log.info("orderId: {}", order.getId());

		Pay pay = queryFactory
			.selectFrom(QPay.pay)
			.where(QPay.pay.id.eq(payId))
			.fetchOne();
		log.info("payId: {}", payId);

		pay.setTotalPayAmount(order.getTotalAmount());
		payRepository.save(pay);
		log.info("pay 정보 저장!");
		// List<OrderMenu> orderMenus = orderRepository.getOrderMenuById(order.getId());

		// Long totalNonAlcoholPrice = orderRepository.getTotalNonAlcoholPrice(order != null ? order.getId() : null);
		// Long totalAlcoholPrice = orderRepository.getTotalAlcoholPrice(order != null ? order.getId() : null);

		// 가맹점 계좌
		String StoreBankCode = "001";
		String StoreAccount = "0017247212643255";

		// 은행 이체 요청 로직(가상계좌 없음)
		List<Member> memberList = participantList.stream()
			.map(Participant::getMember)
			.toList();

		List<Account> accountList = queryFactory
			.selectFrom(QAccount.account)
			.where(QAccount.account.member.in(memberList))
			.fetch();

		// 개인 결제 금액 계산
		calculatePortionCost(payId, memberList, participantList);

		// 이체
		for (Participant participant : participantList) {
			Account account = accountList.stream()
				.filter(acc -> acc.getMember().equals(participant.getMember()))
				.findFirst()
				.orElse(null);
			log.info("memberId: {}", account.getMember().getId());
			log.info("accountNO: {}", account.getAccountNo());
			log.info("payAmount: {}", participant.getPayAmount());

			if (account != null && participant.getPayAmount() != 0) {
				bankUtil.transferAccount(
					StoreBankCode,
					StoreAccount,
					participant.getPayAmount().intValue(),
					account.getBankCode(),
					account.getAccountNo(),
					account.getMember().getApiKey()
				);
			}

			// 알림
			sseEmitterService.sendNotification(participant.getMember().getId(), EventMessage.PAYMENT_COMPLETED_NOTI);
		}

		// 나머지 금액 PiePay가 이체
		Long sumPayAmount = participantRepository.sumPayAmountByPayId(payId);
		log.info("이체 총금액: {}", sumPayAmount);
		long remainAmount = order.getTotalAmount() - sumPayAmount;
		log.info("총금액-결제금액 차액: {}", remainAmount);
		if (remainAmount != 0) {

			bankUtil.transferAccount(
				StoreBankCode,
				StoreAccount,
				(int)remainAmount,
				piePayUtil.getPiePayBankCode(),
				piePayUtil.getPiePayAccount(),
				piePayUtil.getPiePayApiKey()
			);
		}

		// payStatus -> Complete로 변환
		pay.setPayStatus(Pay.PayStatus.COMPLETE);
		order.setPaymentStatus(Order.PaymentStatus.PAID);

		return CompletedPaymentRes.builder()
			.payId(payId)
			.payStatus(pay.getPayStatus())
			.orderInfo(OrderDto.of(order))
			.participants(
				participantList
					.stream()
					.map(ParticipantInfoDto::of)
					.collect(Collectors.toList()))
			.build();
	}

	/**
	 * 개인 결제 금액 계산
	 * @param payId
	 * @param participants
	 */
	private void calculatePortionCost(Long payId, List<Member> memberList, List<Participant> participants) {
		Long totalPayAmount = payRepository.findById(payId).get().getTotalPayAmount();
		log.info("총금액: {}", totalPayAmount);
		/*
		음식값
		 */
		Long nonAlcoholCosts = queryFactory
			.select(orderMenu.menu.menuPrice.multiply(orderMenu.quantity).sum())
			.from(orderMenu)
			.join(orderMenu.order, order)
			.where(order.pay.id.eq(payId)
				.and(orderMenu.menu.menuCategory.eq(Menu.MenuCategory.NON_ALCOHOL)))
			.fetchOne();
		nonAlcoholCosts = nonAlcoholCosts != null ? nonAlcoholCosts : 0L;

		Long participantsCnt = queryFactory
			.select(participant.count())
			.from(participant)
			.where(participant.pay.id.eq(payId))
			.fetchOne();
		participantsCnt = participantsCnt != null ? participantsCnt : 0L;

		log.info("비주류값: {}, 인원: {}", nonAlcoholCosts, participantsCnt);

		// 배분
		Long nonAlcoholPortionCost = 0L;
		if (participantsCnt != 0) {
			nonAlcoholPortionCost = nonAlcoholCosts / participantsCnt;
		} else {
			log.warn("참여인원 0명이므로 비주류값 배분 불가");
		}

		/*
		주류값
		 */
		Long alcoholCosts = queryFactory
			.select(orderMenu.menu.menuPrice.multiply(orderMenu.quantity).sum())
			.from(orderMenu)
			.join(orderMenu.order, order)
			.where(order.pay.id.eq(payId)
				.and(orderMenu.menu.menuCategory.eq(Menu.MenuCategory.ALCOHOL)))
			.fetchOne();
		alcoholCosts = alcoholCosts != null ? alcoholCosts : 0L;

		Long drankAlcoholPersonCnt = queryFactory
			.select(participant.count())
			.from(participant)
			.where(participant.pay.id.eq(payId)
				.and(participant.isDrinkAlcohol.isTrue()))
			.fetchOne();
		drankAlcoholPersonCnt = drankAlcoholPersonCnt != null ? drankAlcoholPersonCnt : 0L;

		log.info("술값: {}, 술마신인원: {}", alcoholCosts, drankAlcoholPersonCnt);

		// 배분
		Long alcoholPortionCost = 0L;
		if (drankAlcoholPersonCnt != 0 && alcoholCosts != 0) {
			alcoholPortionCost = alcoholCosts / drankAlcoholPersonCnt;
		} else {
			log.warn("참여인원 0명 or 술값 0원 이므로 주류값 배분 불가");
		}

		// 대신내주기 정보 반영
		List<PayInstead> payInsteadList = queryFactory
			.selectFrom(QPayInstead.payInstead)
			.where(QPayInstead.payInstead.pay.id.eq(payId))
			.fetch();
		log.info("payInstead: {}", payInsteadList);

		for (Participant participant : participants) {
			// 음주 여부에 따른 기본 PayAmount 설정
			Long basePayAmount =
				participant.getIsDrinkAlcohol() ? (nonAlcoholPortionCost + alcoholPortionCost) : nonAlcoholPortionCost;
			participant.setPayAmount(basePayAmount);
			log.info("payInstead건 무시한 basePayAmount: {}", basePayAmount);

			if (!payInsteadList.isEmpty()) {
				// PayInstead에서 해당 참여자가 borrower로 나타나는 경우
				List<PayInstead> borrowerPayInsteadList = queryFactory
					.selectFrom(QPayInstead.payInstead)
					.where(QPayInstead.payInstead.borrower.eq(participant.getMember())
						.and(QPayInstead.payInstead.pay.id.eq(payId))
					)
					.fetch();

				for (PayInstead payInstead : borrowerPayInsteadList) {
					payInstead.setAmount(basePayAmount);
				}

				// PayInstead에서 해당 참여자가 lender로 나타나는 경우
				List<PayInstead> lenderPayInsteadList = queryFactory
					.selectFrom(QPayInstead.payInstead)
					.where(QPayInstead.payInstead.lender.eq(participant.getMember())
						.and(QPayInstead.payInstead.pay.id.eq(payId))
					)
					.fetch();

				for (PayInstead payInstead : lenderPayInsteadList) {
					payInstead.setAmount(basePayAmount);
				}
			}
		}

		if (!payInsteadList.isEmpty()) {
			for (Participant participant : participants) {
				log.info("payInstead건 존재!");
				// PayInstead에서 해당 참여자가 borrower로 나타나는 경우
				Long basePayAmount = participant.getPayAmount();
				log.info("주류유무만 반영된 basePayAmount: {}", basePayAmount);
				List<PayInstead> borrowerPayInsteadList = queryFactory
					.selectFrom(QPayInstead.payInstead)
					.where(QPayInstead.payInstead.borrower.eq(participant.getMember())
						.and(QPayInstead.payInstead.pay.id.eq(payId))
					)
					.fetch();

				for (PayInstead payInstead : borrowerPayInsteadList) {
					basePayAmount -= payInstead.getAmount();
				}

				// PayInstead에서 해당 참여자가 lender로 나타나는 경우
				List<PayInstead> lenderPayInsteadList = queryFactory
					.selectFrom(QPayInstead.payInstead)
					.where(QPayInstead.payInstead.lender.eq(participant.getMember())
						.and(QPayInstead.payInstead.pay.id.eq(payId))
					)
					.fetch();

				for (PayInstead payInstead : lenderPayInsteadList) {
					basePayAmount += payInstead.getAmount();
				}
				// 참여자 정보 저장
				// 계산된 PayAmount 설정
				log.info("추가한 basePayAmount: {}", basePayAmount);
				participant.setPayAmount(basePayAmount);

				// 변경된 참여자 정보 저장
				participantRepository.save(participant);
			}
		}
		// for (Participant participant : participants) {
		// 	if (participant.getIsDrinkAlcohol()) {
		// 		Long totalPortionCost = nonAlcoholPortionCost + alcoholPortionCost;
		// 		participant.setPayAmount(totalPortionCost);
		// 	} else {
		// 		participant.setPayAmount(nonAlcoholPortionCost);
		// 	}
		//
		// 	participantRepository.save(participant);
		// }
		log.info("participant에 각 금액 정보 저장 완료!");
	}

	// public List<Pay> findPayByMemberId(long memberId) {
	// 	List<Meet> meets = meetRepository.findAllBy
	// 	Member member = memberRepository.findById(memberId)
	// 		.orElseThrow(() -> new IllegalArgumentException("해당 memberId을 가진 Member을 찾을 수 없음"));
	// 	return payRepository.findByMeetOrderByCreatedAtDesc(member);
	// }

	//	public  findPay (Meet meet) {
	//		return payRepository.findFirstByMeetOrderByCreatedAtDesc(meet);
	//	}
}
