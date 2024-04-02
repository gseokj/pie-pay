package com.pay.pie.domain.meet.dto;

import java.time.LocalDateTime;

import com.pay.pie.domain.order.dto.response.OrderOfPayResponse;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.Getter;

@Getter
public class PayResponse {
	// private final Meet meet;
	private final Long payId;
	private final Pay.PayStatus payStatus;
	private final Long openerId;
	private final Long totalPayAmount;
	private final OrderOfPayResponse orders;
	private final LocalDateTime updatedAt;

	public PayResponse(Pay pay, OrderOfPayResponse order) {
		// this.meet = pay.getMeet();
		this.payId = pay.getId();
		this.payStatus = pay.getPayStatus();
		this.openerId = pay.getOpenerId();
		this.totalPayAmount = pay.getTotalPayAmount();
		this.orders = order;
		this.updatedAt = pay.getUpdatedAt();
	}
}
