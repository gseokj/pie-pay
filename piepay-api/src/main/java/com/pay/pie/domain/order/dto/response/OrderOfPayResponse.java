package com.pay.pie.domain.order.dto.response;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.store.entity.Store;

import lombok.Getter;

@Getter
public class OrderOfPayResponse {
	private final Long orderId;
	private final Store store;
	private final Enum<Order.PaymentStatus> paymentStatus;

	public OrderOfPayResponse(Order order) {
		this.orderId = order.getId();
		this.store = order.getStore();
		this.paymentStatus = order.getPaymentStatus();
		// newOrderMenuResponses에 있는 menuPrice 값들을 모두 더한 값을 계산
	}

	public Long getOrderId() {
		return orderId;
	}

	public Store getStore() {
		return store;
	}

	public Enum<Order.PaymentStatus> getPaymentStatus() {
		return paymentStatus;
	}

}
