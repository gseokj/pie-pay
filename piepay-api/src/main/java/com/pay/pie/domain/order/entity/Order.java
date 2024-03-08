package com.pay.pie.domain.order.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "`order`")
public class Order {
	@Id
	@Column(name = "order_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "store_id", nullable = false)
	private Long storeId;

	@NotNull
	@Column(name = "pay_id", nullable = false)
	private Long payId;

	@Column(name = "total_amount")
	private Integer totalAmount;
}