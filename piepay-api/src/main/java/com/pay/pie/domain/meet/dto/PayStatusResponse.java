package com.pay.pie.domain.meet.dto;

import com.pay.pie.domain.pay.entity.Pay;

import lombok.Getter;

@Getter
public class PayStatusResponse {
	private final Pay.PayStatus payStatus;

	public PayStatusResponse(Pay pay) {
		this.payStatus = pay.getPayStatus();
	}
}
