package com.pay.pie.domain.orderMenu.dto;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddOrderMenuRequest {
	private Order order;
	private Menu menu;
	private int quantity;

	public OrderMenu toEntity() {
		return OrderMenu.builder()
			.order(order)
			.menu(menu)
			.quantity(quantity)
			.build();
	}
}
