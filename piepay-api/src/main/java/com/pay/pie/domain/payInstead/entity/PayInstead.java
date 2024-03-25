package com.pay.pie.domain.payInstead.entity;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.pay.entity.Pay;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Getter
@Table(name = "pay_instead")
public class PayInstead extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pay_instead_id")
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pay_id", nullable = false)
	private Pay pay;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "borrower_id", nullable = false)
	private Member borrower;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lender_id", nullable = false)
	private Member lender;

	@NotNull
	@Column(name = "amount", nullable = false)
	private Long amount;

	@NotNull
	@Column(name = "is_payback", nullable = false)
	private Boolean payback = false;
}