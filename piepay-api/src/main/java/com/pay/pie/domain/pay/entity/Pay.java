package com.pay.pie.domain.pay.entity;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.meet.entity.Meet;

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
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "pay")
public class Pay extends BaseEntity {

	public enum PayStatus {
		OPEN, ING, COMPLETE, CLOSE
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pay_id")
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "meet_id")
	private Meet meet;

	@NotNull
	@Column(name = "pay_status", nullable = false)
	@Enumerated(EnumType.STRING)
	private PayStatus payStatus;

	@NotNull
	@Column(name = "opener_id", nullable = false)
	private Long openerId;

	@Column(name = "total_pay_amount")
	private Long totalPayAmount;
}