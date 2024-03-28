package com.pay.pie.domain.orderMenu.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class OrderMenuOfOrderResponse {
	private final List<NewOrderMenuResponse> menus;
	private final Long totalPayAmount;

	public OrderMenuOfOrderResponse(List<NewOrderMenuResponse> newOrderMenuResponses, Long totalPayAmount) {
		// this.member = memberMeet.getMemberId();
		this.menus = newOrderMenuResponses;
		this.totalPayAmount = totalPayAmount;
	}
}
