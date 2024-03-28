package com.pay.pie.domain.notification.entity;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.member.entity.Member;

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
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "notifications")
public class Notification extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notification_id", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	// @Column(name = "member_id", nullable = false)
	private Member member;

	@Size(max = 255)
	@NotNull
	@Column(name = "message", nullable = false)
	private String message;

	@NotNull
	@Column(name = "read_or_not", nullable = false)
	private Boolean readOrNot = false;

	@NotNull
	@Column(name = "reference_id", nullable = false)
	private Long referenceId;
}