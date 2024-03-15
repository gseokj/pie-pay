package com.pay.pie.domain.member.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "member")
public class Member {
	@Id
	@Column(name = "member_id", nullable = false)
	private Long id;

	@Size(max = 255)
	@Column(name = "pay_password")
	private String payPassword;

	@Size(max = 11)
	@Column(name = "phone", length = 11)
	private String phone;

	@Size(max = 30)
	@NotNull
	@Column(name = "nickname", nullable = false, length = 30)
	private String nickname;

	@Size(max = 30)
	@NotNull
	@Column(name = "email", nullable = false, length = 30)
	private String email;

	@ElementCollection(fetch = FetchType.LAZY)
	@Enumerated(EnumType.STRING)
	@CollectionTable(name = "member_role", joinColumns = @JoinColumn(name = "member_id"))
	private Set<MemberRole> role = new HashSet<>();

	public String getUserRole() {
		return role.toString();
	}
}