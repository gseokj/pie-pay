package com.pay.pie.domain.memberMeet.entity;

import com.pay.pie.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "member_meet")
public class MemberMeet extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_meet_id")
	private Long id;

	@NotNull
	@Column(name = "member_id", nullable = false)
	private Long memberId;

	@NotNull
	@Column(name = "meet_id", nullable = false)
	private Long meetId;

	@Builder // 빌더 패턴으로 객체 새성
	public MemberMeet(Long memberId, Long meetId) {
		this.memberId = memberId;
		this.meetId = meetId;
	}
}