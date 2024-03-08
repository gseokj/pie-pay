package com.pay.pie.domain.notification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {
	@Id
	@Column(name = "`Key`", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "member_id", nullable = false)
	private Long memberId;

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