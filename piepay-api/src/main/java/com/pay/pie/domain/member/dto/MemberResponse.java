package com.pay.pie.domain.member.dto;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.entity.MemberRole;

import lombok.Getter;

@Getter
public class MemberResponse {

	private final Long memberId;
	private final String nickname;
	private final String profileImage;
	private final String phoneNumber;
	private final MemberRole memberRole;
	private final String email;

	public MemberResponse(Member member) {
		this.memberId = member.getId();
		this.nickname = member.getNickname();
		this.profileImage = member.getProfileImage();
		this.phoneNumber = member.getPhoneNumber();
		this.memberRole = member.getMemberRole();
		this.email = member.getEmail();
	}
}
