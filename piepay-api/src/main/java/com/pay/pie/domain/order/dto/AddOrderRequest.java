package com.pay.pie.domain.order.dto;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.domain.store.entity.Store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
@Setter
public class AddOrderRequest {
	private Store store;
	private Pay pay;
	private Order.PaymentStatus paymentStatus;
	private Long totalAmount;

	public Order toEntity() {
		return Order.builder()
			.store(store)
			.pay(pay)
			.paymentStatus(paymentStatus)
			.totalAmount(totalAmount)
			.build();
	}
}
