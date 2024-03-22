package com.pay.pie.domain.order.entity;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.domain.store.entity.Store;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Getter
@Table(name = "`order`")
@Builder
// @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order extends BaseEntity {

	public enum PaymentStatus {
		PAID, UNPAID, CANCELLED
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "store_id", nullable = false)
	private Store store;

	// @NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pay_id", nullable = false)
	private Pay pay;

	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;

	@Column(name = "total_amount")
	private Long totalAmount;
}