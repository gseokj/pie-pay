package com.pay.pie.domain.member.dto;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.entity.MemberRole;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class MemberResponse {

	private final Long memberId;
	private final String nickname;
	private final String profileImage;
	private final String phoneNumber;
	private final MemberRole memberRole;
	private final String email;
	private final Long payCount;
	private final Long payTotal;

	public MemberResponse(Member member, Long payCount, Long payTotal) {
		this.memberId = member.getId();
		this.nickname = member.getNickname();
		this.profileImage = member.getProfileImage();
		this.phoneNumber = member.getPhoneNumber();
		this.memberRole = member.getMemberRole();
		this.email = member.getEmail();
		this.payCount = payCount;
		this.payTotal = payTotal;
	}
}
