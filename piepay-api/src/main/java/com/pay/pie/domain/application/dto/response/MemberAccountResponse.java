package com.pay.pie.domain.application.dto.response;

import com.pay.pie.domain.account.entity.Account;

import lombok.Getter;

@Getter
public class MemberAccountResponse {

	String bankCode;
	String accountNo;
	String balance;
	boolean mainAccount;

	public MemberAccountResponse(Account account, String balance){
		this.bankCode = account.getBankCode();
		this.accountNo = account.getAccountNo();
		this.balance  = balance;
		this.mainAccount = account.isMainAccount();
	}

}
