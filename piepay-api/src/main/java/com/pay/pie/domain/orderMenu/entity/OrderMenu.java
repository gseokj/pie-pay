package com.pay.pie.domain.orderMenu.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "order_menu")
public class OrderMenu {
	@Id
	@Column(name = "order_menu_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "order_id", nullable = false)
	private Long orderId;

	@NotNull
	@Column(name = "menu_id", nullable = false)
	private Long menuId;

	@NotNull
	@Column(name = "quantity", nullable = false)
	private Integer quantity;
}