package com.pay.pie.domain.member.dto;

import com.pay.pie.domain.member.entity.Member;

import lombok.Getter;

@Getter
public class MemberResponse {

	private final String nickname;
	private final String profileImage;

	public MemberResponse(Member member) {
		this.nickname = member.getNickname();
		this.profileImage = member.getProfileImage();
	}
}
