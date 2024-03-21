package com.pay.pie.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberRole {
	ROLE_NOT_CERTIFIED_MEMBER("ROLE_NOT_CERTIFIED"),
	ROLE_CERTIFIED_MEMBER("ROLE_CERTIFIED");

	String value;

}
