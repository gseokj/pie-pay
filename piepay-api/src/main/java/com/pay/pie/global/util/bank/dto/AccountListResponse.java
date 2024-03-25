package com.pay.pie.global.util.bank.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccountListResponse {

	@JsonProperty("Header")
	private Header Header;
	@JsonProperty("REC")
	private List<Account> account;
}
