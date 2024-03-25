package com.pay.pie.domain.participant.entity;

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
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "participant")
public class Participant extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "participant_id")
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pay_id", nullable = false)
	private Pay pay;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@NotNull
	@Column(name = "is_drink_alcohol", nullable = false)
	private Boolean isDrinkAlcohol = true;

	@NotNull
	@Column(name = "pay_agree", nullable = false)
	@Builder.Default
	private Boolean payAgree = false;

	@Column(name = "pay_amount")
	private Long payAmount;

}