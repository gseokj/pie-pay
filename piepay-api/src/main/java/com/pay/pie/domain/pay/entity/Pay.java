package com.pay.pie.domain.pay.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.meet.entity.Meet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "pay")
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Pay extends BaseEntity {

	public enum PayStatus {
		OPEN, ING, COMPLETE, CLOSE
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pay_id")
	private Long id;

	// @NotNull
	@ManyToOne
	// (fetch = FetchType.LAZY)  --> 에러 때문에 우선 주석처리함 by 재언
	@JoinColumn(name = "meet_id")
	private Meet meet;

	@NotNull
	@Column(name = "pay_status", nullable = false)
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private PayStatus payStatus = PayStatus.OPEN;

	@NotNull
	@Column(name = "opener_id", nullable = false)
	private Long openerId;

	@Column(name = "total_pay_amount")
	private Long totalPayAmount;

}