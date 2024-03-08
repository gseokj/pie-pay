package com.pay.pie.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "member")
public class Member {
	@Id
	@Column(name = "member_id", nullable = false)
	private Long id;

	@Size(max = 255)
	@Column(name = "pay_password")
	private String payPassword;

	@Size(max = 11)
	@Column(name = "Field3", length = 11)
	private String field3;

	@Size(max = 30)
	@NotNull
	@Column(name = "nickname", nullable = false, length = 30)
	private String nickname;

	@Size(max = 30)
	@NotNull
	@Column(name = "email", nullable = false, length = 30)
	private String email;
}