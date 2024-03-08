package com.pay.pie.domain.payInstead.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "pay_instead")
public class PayInstead {
	@Id
	@Column(name = "pay_instead_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "pay_id", nullable = false)
	private Long payId;

	@NotNull
	@Column(name = "lender", nullable = false)
	private Long lender;

	@NotNull
	@Column(name = "borrower", nullable = false)
	private Long borrower;

	@NotNull
	@Column(name = "amount", nullable = false)
	private Integer amount;

	@NotNull
	@Column(name = "is_payback", nullable = false)
	private Boolean isPayback = false;
}