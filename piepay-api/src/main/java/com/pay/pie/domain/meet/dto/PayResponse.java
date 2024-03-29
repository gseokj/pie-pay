package com.pay.pie.domain.meet.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.Getter;

@Getter
public class PayResponse {
	// private final Meet meet;
	private final Pay.PayStatus payStatus;
	private final Long openerId;
	private final Long totalPayAmount;
	private final List<Order> orders;
	private final LocalDateTime updatedAt;

	public PayResponse(Pay pay, List<Order> orders) {
		// this.meet = pay.getMeet();
		this.payStatus = pay.getPayStatus();
		this.openerId = pay.getOpenerId();
		this.totalPayAmount = pay.getTotalPayAmount();
		this.orders = orders;
		this.updatedAt = pay.getUpdatedAt();
	}
}
