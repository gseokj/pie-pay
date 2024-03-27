package com.pay.pie.domain.payInstead.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.account.entity.QAccount;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
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
	private final JPAQueryFactory queryFactory;
	private BankUtil bankUtil;

	@Override
	public void paybackInsteadPayment(Long payInsteadId, SecurityUserDto securityUserDto) {
		// Borrower(나)
		Long borrowerId = securityUserDto.getMemberId();
		Member borrower = memberRepository.findById(borrowerId)
			.orElseThrow(
				() -> new IllegalArgumentException("Borrower는 없는 회원입니다.")
			);
		PayInstead payInstead = payInsteadRepository.findByBorrower(borrower);
		Member lender = memberRepository.findById(payInstead.getLender().getId())
			.orElseThrow(
				() -> new IllegalArgumentException("lender는 없는 회원입니다.")
			);

		// borrower 잔액 조회
		Account account = queryFactory
			.selectFrom(QAccount.account)
			.where(QAccount.account.member.eq(borrower))
			.fetchOne();

		String accountBalance = bankUtil.getAccountBalance(account.getBankCode(), account.getAccountNo(),
			securityUserDto.getUserKey());
		if (Long.parseLong(accountBalance) >= payInstead.getAmount()) {
			// 이체 진행

		}

	}
}
