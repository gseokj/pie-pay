package com.pay.pie.domain.meet.dto;

import com.pay.pie.domain.pay.entity.Pay;

import lombok.Getter;

@Getter
public class PayResponse {
	// private final Meet meet;
	private final Pay.PayStatus payStatus;
	private final Long openerId;
	private final Long totalPayAmount;

	public PayResponse(Pay pay) {
		// this.meet = pay.getMeet();
		this.payStatus = pay.getPayStatus();
		this.openerId = pay.getOpenerId();
		this.totalPayAmount = pay.getTotalPayAmount();
	}
}
