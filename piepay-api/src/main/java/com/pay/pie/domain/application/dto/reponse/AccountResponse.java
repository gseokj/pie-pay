package com.pay.pie.domain.application.dto.reponse;

import com.pay.pie.domain.account.entity.Account;

import lombok.Getter;

@Getter
public class AccountResponse {
	private final Long accountId;
	private final String bankCode;
	private final String accountNo;

	public AccountResponse(Account account) {

		this.accountId = account.getAccountId();
		this.accountNo = account.getAccountNo();
		this.bankCode = account.getBankCode();
	}
}
