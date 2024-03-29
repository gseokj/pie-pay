package com.pay.pie.domain.orderMenu.dto;

import com.pay.pie.domain.menu.entity.Menu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class OrderMenuDto {

	private final Menu menu;
	private final Integer total;

	public static OrderMenuDto of(Menu menu) {
		return OrderMenuDto.builder()
			.menu(Menu.builder()
				.id(menu.getId())
				.menuName(menu.getMenuName())
				.menuPrice(menu.getMenuPrice())
				.build())
			.total((int)(menu.getMenuPrice() * menu.getMenuPrice()))
			.build();
	}
}
