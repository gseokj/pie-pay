package com.pay.pie.domain.account.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.account.repository.AccountRepository;
import com.pay.pie.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AccountService {
	private final AccountRepository accountRepository;

	public List<Account> findByMember(Member member) {

		return accountRepository.findAllByMember(member);
	}
}
