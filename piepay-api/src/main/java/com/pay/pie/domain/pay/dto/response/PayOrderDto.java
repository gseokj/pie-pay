package com.pay.pie.domain.pay.dto.response;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PayOrderDto {
	private Pay pay;
	private Order order;
}
