package com.pay.pie.domain.application.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.account.repository.AccountRepository;
import com.pay.pie.domain.application.dto.response.MemberAccountResponse;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.exception.MemberException;
import com.pay.pie.domain.member.exception.MemberExceptionCode;
import com.pay.pie.global.util.bank.BankUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberAndAccountService {

	private final MemberRepository memberRepository;
	private final AccountRepository accountRepository;
	private final BankUtil bankUtil;

	public List<MemberAccountResponse> getAccountsInfo(Long memberId) {

		Member findMember = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(MemberExceptionCode.NOT_FOUND_MEMBER));

		List<Account> accounts = accountRepository.findAllByMember(findMember);

		return accounts.stream()
			.sorted(Comparator.comparing(Account::isMainAccount).reversed())
			.map(account ->
				new MemberAccountResponse(
					account,
					bankUtil.getAccountBalance(account.getBankCode(), account.getAccountNo(), findMember.getApiKey())
				)
			)
			.toList();
	}
}
