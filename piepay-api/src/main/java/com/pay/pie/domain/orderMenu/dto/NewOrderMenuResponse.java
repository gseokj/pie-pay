package com.pay.pie.domain.orderMenu.dto;

import com.pay.pie.domain.menu.dto.MenuResponse;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;

import lombok.Getter;

@Getter
public class NewOrderMenuResponse {
	private final MenuResponse menu;
	private final Integer quantity;

	public NewOrderMenuResponse(OrderMenu orderMenu) {
		// this.member = memberMeet.getMemberId();
		this.menu = new MenuResponse(orderMenu.getMenu());
		this.quantity = orderMenu.getQuantity();
	}
}
