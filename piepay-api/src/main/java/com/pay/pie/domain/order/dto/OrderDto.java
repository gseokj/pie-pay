package com.pay.pie.domain.order.dto;

import com.pay.pie.domain.order.entity.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class OrderDto {

	private final Long orderId;
	private final String storeName;
	private final Long totalAmount;

	public static OrderDto of(Order order) {
		return OrderDto.builder()
			.orderId(order.getId())
			.storeName(order.getStore().getStoreName())
			.totalAmount(order.getTotalAmount())
			.build();
	}
}
