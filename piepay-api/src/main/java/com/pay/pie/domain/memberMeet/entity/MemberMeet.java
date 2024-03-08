package com.pay.pie.domain.memberMeet.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "member_meet")
public class MemberMeet {
	@Id
	@Column(name = "member_meet_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "member_id", nullable = false)
	private Long memberId;

	@NotNull
	@Column(name = "meet_id", nullable = false)
	private Long meetId;
}