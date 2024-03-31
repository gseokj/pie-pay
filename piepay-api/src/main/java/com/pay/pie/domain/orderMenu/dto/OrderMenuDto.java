package com.pay.pie.domain.orderMenu.dto;

import com.pay.pie.domain.orderMenu.entity.OrderMenu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class OrderMenuDto {

	private final String menuName;
	private final Long menuPrice;
	private final Integer quantity;
	private final Integer total;

	public static OrderMenuDto of(OrderMenu orderMenu) {
		int total = orderMenu.getMenu().getMenuPrice().intValue() * orderMenu.getQuantity();
		return OrderMenuDto.builder()
			.menuName(orderMenu.getMenu().getMenuName())
			.menuPrice(orderMenu.getMenu().getMenuPrice())
			.quantity(orderMenu.getQuantity())
			.total(total)
			.build();
	}
}
