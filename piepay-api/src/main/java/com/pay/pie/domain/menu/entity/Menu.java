package com.pay.pie.domain.menu.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "menu")
public class Menu {
	@Id
	@Column(name = "menu_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "store_id", nullable = false)
	private Long storeId;

	@Size(max = 50)
	@NotNull
	@Column(name = "menu_name", nullable = false, length = 50)
	private String menuName;

	@NotNull
	@Column(name = "menu_price", nullable = false)
	private Integer menuPrice;
}