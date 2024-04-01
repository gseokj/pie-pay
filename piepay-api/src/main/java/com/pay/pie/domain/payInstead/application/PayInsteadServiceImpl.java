package com.pay.pie.domain.payInstead.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.account.entity.QAccount;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.notification.dto.EventMessage;
import com.pay.pie.domain.notification.service.SseEmitterService;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.payInstead.dao.PayInsteadRepository;
import com.pay.pie.domain.payInstead.entity.PayInstead;
import com.pay.pie.global.security.dto.SecurityUserDto;
import com.pay.pie.global.util.bank.BankUtil;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayInsteadServiceImpl implements PayInsteadService {

	private final PayInsteadRepository payInsteadRepository;
	private final MemberRepository memberRepository;
	private final ParticipantRepository participantRepository;
	private final JPAQueryFactory queryFactory;
	private final SseEmitterService sseEmitterService;
	private final BankUtil bankUtil;

	@Override
	public void paybackInsteadPayment(Long payInsteadId, SecurityUserDto securityUserDto) {
		// borrower(나)
		Long borrowerId = securityUserDto.getMemberId();
		Member borrower = memberRepository.findById(borrowerId)
			.orElseThrow(
				() -> new IllegalArgumentException("Borrower는 없는 회원입니다.")
			);
		PayInstead payInstead = payInsteadRepository.findById(payInsteadId).orElseThrow(
			() -> new IllegalArgumentException("없는 대신내주기 id")
		);
		log.info("payInstead.getPay().getId(): {}", payInstead.getPay().getId());
		Member lender = memberRepository.findById(payInstead.getLender().getId())
			.orElseThrow(
				() -> new IllegalArgumentException("lender는 없는 회원입니다.")
			);

		// borrower 계좌 조회
		Account borrowerAccount = queryFactory
			.selectFrom(QAccount.account)
			.where(QAccount.account.member.eq(borrower))
			.fetchOne();
		// borrower 잔액 조회
		String accountBalance = bankUtil.getAccountBalance(
			borrowerAccount.getBankCode(),
			borrowerAccount.getAccountNo(),
			securityUserDto.getUserKey());

		// lender 계좌 조회
		Account lenderAccount = queryFactory
			.selectFrom(QAccount.account)
			.where(QAccount.account.member.eq(lender))
			.fetchOne();

		// 이체 진행
		if (Long.parseLong(accountBalance) >= payInstead.getAmount()) {
			bankUtil.transferAccount(
				lenderAccount.getBankCode(),
				lenderAccount.getAccountNo(),
				payInstead.getAmount().intValue(),
				borrowerAccount.getBankCode(),
				borrowerAccount.getAccountNo(),
				borrowerAccount.getMember().getApiKey());
		} else {
			bankUtil.sendErrorCode("에러발생");
		}

		// payInstead DB update 이체완료
		payInstead.setPayback(true);
		payInsteadRepository.save(payInstead);
		log.info("payInstead.setPayback -> true");

		// participant 지불 내역 update
		Participant lenderParticipant = participantRepository.findByMemberIdAndPayId(
			lender.getId(),
			payInstead.getPay().getId()
		);
		log.info("lenderParticipant Id: {}", lenderParticipant.getId());
		Participant borrowerParticipant = participantRepository.findByMemberIdAndPayId(
			borrowerId,
			payInstead.getPay().getId()
		);
		log.info("borrowerParticipant Id: {}", borrowerParticipant.getId());

		Long lenderAmount = lenderParticipant.getPayAmount();
		lenderParticipant.setPayAmount(lenderAmount - payInstead.getAmount());

		Long borrowerAmount = borrowerParticipant.getPayAmount();
		borrowerParticipant.setPayAmount(borrowerAmount + payInstead.getAmount());

		// 알림
		sseEmitterService.sendNotification(lender.getId(), EventMessage.PAYMENT_PAYINSTEAD_LENDER_NOTI);
		sseEmitterService.sendNotification(borrower.getId(), EventMessage.PAYMENT_PAYINSTEAD_BORROWER_NOTI);
	}
}
