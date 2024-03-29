package com.pay.pie.domain.orderMenu.dto;

import java.util.List;

import com.pay.pie.domain.store.dto.StoreInfoDto;

import lombok.Getter;

@Getter
public class OrderMenuOfOrderResponse {
	private final List<NewOrderMenuResponse> menus;
	private final Long totalPayAmount;
	private final StoreInfoDto store;

	public OrderMenuOfOrderResponse(List<NewOrderMenuResponse> newOrderMenuResponses, StoreInfoDto store,
		Long totalPayAmount) {
		// this.member = memberMeet.getMemberId();
		this.menus = newOrderMenuResponses;
		this.totalPayAmount = totalPayAmount;
		this.store = store;
	}
}
