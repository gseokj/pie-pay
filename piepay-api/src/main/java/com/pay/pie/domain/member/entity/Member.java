package com.pay.pie.domain.member.entity;

import com.pay.pie.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "member")
public class Member extends BaseEntity {
	@Id
	@Column(name = "member_id", nullable = false)
	private Long id;

	@Size(max = 255)
	@Column(name = "pay_password")
	private String payPassword;

	@Size(max = 11)
	@Column(name = "phone_number", length = 11)
	private String phoneNumber;

	@Size(max = 30)
	@NotNull
	@Column(name = "nickname", nullable = false, length = 30)
	private String nickname;

	@Size(max = 255)
	@Column(name = "profile_image", length = 255)
	private String profileImage;
}