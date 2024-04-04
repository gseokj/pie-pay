package com.pay.pie.global.util.bank.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class TransferAccountResponse {

	@JsonProperty("Header")
	private Header Header;
	@JsonProperty("REC")
	private List<Account> account;
}
