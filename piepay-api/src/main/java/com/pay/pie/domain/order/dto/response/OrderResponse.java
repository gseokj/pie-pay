package com.pay.pie.domain.order.dto.response;

import java.util.List;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.dto.NewOrderMenuResponse;
import com.pay.pie.domain.store.entity.Store;

import lombok.Getter;

@Getter
public class OrderResponse {
	private final Long orderId;
	private final Store store;
	private final Enum<Order.PaymentStatus> paymentStatus;
	private final Long totalAmount;
	private final List<NewOrderMenuResponse> newOrderMenusResponse;

	public OrderResponse(Order order, List<NewOrderMenuResponse> newOrderMenuResponses) {
		this.orderId = order.getId();
		this.store = order.getStore();
		this.paymentStatus = order.getPaymentStatus();
		// newOrderMenuResponses에 있는 menuPrice 값들을 모두 더한 값을 계산
		Long totalMenuPrice = newOrderMenuResponses.stream()
			.mapToLong(response -> response.getMenu().getMenuPrice() * response.getQuantity())
			.sum();

		this.totalAmount = order.getTotalAmount();
		this.newOrderMenusResponse = newOrderMenuResponses;
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

	public Long getTotalAmount() {
		return totalAmount;
	}

	public List<NewOrderMenuResponse> getNewOrderMenusResponse() {
		return newOrderMenusResponse;
	}
}
