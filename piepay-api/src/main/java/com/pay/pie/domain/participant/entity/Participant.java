package com.pay.pie.domain.participant.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "participant")
public class Participant {
	@Id
	@Column(name = "participant_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "pay_id", nullable = false)
	private Long payId;

	@NotNull
	@Column(name = "member_id", nullable = false)
	private Long memberId;

	@NotNull
	@Column(name = "is_drink_alcohol", nullable = false)
	private Boolean isDrinkAlcohol = false;

	@NotNull
	@Column(name = "pay_agree", nullable = false)
	private Boolean payAgree = false;

	@Column(name = "pay_amount")
	private Integer payAmount;
}