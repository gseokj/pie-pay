package com.pay.pie.domain.menu.dto;

import com.pay.pie.domain.menu.entity.Menu;

public class MenuResponse {
	private final String menuName;
	private final Long menuPrice;
	private final Enum<Menu.MenuCategory> menuCategory;

	public MenuResponse(Menu menu) {
		this.menuName = menu.getMenuName();
		this.menuPrice = menu.getMenuPrice();
		this.menuCategory = menu.getMenuCategory();
	}

	public String getMenuName() {
		return menuName;
	}

	public Long getMenuPrice() {
		return menuPrice;
	}

	public Enum<Menu.MenuCategory> getMenuCategory() {
		return menuCategory;
	}
}
