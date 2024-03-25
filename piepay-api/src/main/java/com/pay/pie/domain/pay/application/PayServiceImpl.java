package com.pay.pie.domain.pay.application;

import static com.pay.pie.domain.order.entity.QOrder.*;
import static com.pay.pie.domain.orderMenu.entity.QOrderMenu.*;
import static com.pay.pie.domain.participant.entity.QParticipant.*;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.dto.response.CompletedPaymentRes;
import com.pay.pie.domain.pay.entity.Pay;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayServiceImpl implements PayService {

	private final PayRepository payRepository;
	private final MeetRepository meetRepository;
	private final ParticipantRepository participantRepository;
	private final JPAQueryFactory queryFactory;

	public List<Pay> findPayByMeetId(long meetId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));
		return payRepository.findByMeetOrderByCreatedAtDesc(meet);
	}

	@Override
	public CompletedPaymentRes processPayment(Long payId) {
		//참여자 정보
		List<Participant> participantList = payRepository.findParticipantsByPayId(payId);

		log.info("참여자들: {}", participantList);

		// 결제 테이블에 가게정보, 영수증 정보 저장

		// 개인 결제 금액 계산
		calculatePortionCost(payId, participantList);

		// 은행 이체 요청 로직

		return null;
	}

	public Pay findRecentPayByMeetId(long meetId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));

		return payRepository.findFirstByMeetOrderByCreatedAtDesc(meet);
	}

	/**
	 * 개인 결제 금액 계산
	 * @param payId
	 * @param participants
	 */
	private void calculatePortionCost(Long payId, List<Participant> participants) {
		Long totalPayAmount = payRepository.findById(payId).get().getTotalPayAmount();
		log.info("총금액: {}", totalPayAmount);
		/*
		음식값
		 */
		Long nonCosts = queryFactory
			.select(orderMenu.menu.menuPrice.sum())
			.from(orderMenu)
			.join(orderMenu.order, order)
			.where(order.pay.id.eq(payId)
				.and(orderMenu.menu.menuCategory.eq(Menu.MenuCategory.NON_ALCOHOL)))
			.fetchOne();

		Long participantsCnt = queryFactory
			.select(participant.count())
			.from(participant)
			.where(participant.pay.id.eq(payId))
			.fetchOne();

		log.info("비주류값: {}, 인원: {}", nonCosts, participantsCnt);

		// 배분
		Long nonAlcoholPortionCost = 0L;
		if (participantsCnt != 0) {
			nonAlcoholPortionCost = nonCosts / participantsCnt;
		} else {
			log.warn("참여인원 0명이므로 비주류값 배분 불가");
		}

		/*
		주류값
		 */
		Long alcoholCosts = queryFactory
			.select(orderMenu.menu.menuPrice.sum())
			.from(orderMenu)
			.join(orderMenu.order, order)
			.where(order.pay.id.eq(payId)
				.and(orderMenu.menu.menuCategory.eq(Menu.MenuCategory.ALCOHOL)))
			.fetchOne();

		Long drankAlcoholPersonCnt = queryFactory
			.select(participant.count())
			.from(participant)
			.where(participant.pay.id.eq(payId)
				.and(participant.isDrinkAlcohol.isTrue()))
			.fetchOne();

		log.info("술값: {}, 술마신인원: {}", alcoholCosts, drankAlcoholPersonCnt);

		// 배분
		Long alcoholPortionCost = 0L;
		if (drankAlcoholPersonCnt != 0) {
			alcoholPortionCost = alcoholCosts / drankAlcoholPersonCnt;
		} else {
			log.warn("참여인원 0명이므로 주류값 배분 불가");
		}

		// 참여자 정보 저장
		for (Participant participant : participants) {
			if (participant.getIsDrinkAlcohol()) {
				Long totalPortionCost = nonAlcoholPortionCost + alcoholPortionCost;
				participant.setPayAmount(totalPortionCost);
			} else {
				participant.setPayAmount(nonAlcoholPortionCost);
			}

			participantRepository.save(participant);
		}
	}
}
