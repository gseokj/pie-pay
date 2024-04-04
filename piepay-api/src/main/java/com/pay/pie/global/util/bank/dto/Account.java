package com.pay.pie.global.util.bank.dto;

import lombok.Getter;

@Getter
public class Account {

	private String bankCode;
	private String bankName;
	private String userName;
	private String accountNo;
	private String accountName;
	private String accountTypeCode;
	private String accountTypeName;
	private String accountCreatedDate;
	private String accountExpiryDate;
	private String dailyTransferLimit;
	private String oneTimeTransferLimit;
	private String accountBalance;
	private String transactionUniqueNo;
	private String transactionTypeName;
	private String transactionAccountNo;

}
