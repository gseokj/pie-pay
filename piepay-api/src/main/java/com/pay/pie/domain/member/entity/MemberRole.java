package com.pay.pie.domain.member.entity;

public enum MemberRole {
	USER("유저");
	final String korean;

	MemberRole(String korean) {
		this.korean = korean;
	}
}
