package com.pay.pie.domain.pay.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "pay")
public class Pay {
	@Id
	@Column(name = "pay_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "meet_id", nullable = false)
	private Long meetId;

	@NotNull
	@Column(name = "pay_condition", nullable = false)
	private Boolean payCondition = false;

	@Size(max = 255)
	@NotNull
	@Column(name = "opener_id", nullable = false)
	private String openerId;

	@Column(name = "total_pay_amount")
	private Integer totalPayAmount;
}