package com.pay.pie.domain.member.dto.response;

import com.pay.pie.domain.member.entity.Member;

import lombok.Builder;

@Builder
public record MemberDetailResponse(
	Long memberId,
	String nickname,
	String profileImage,
	String phoneNumber,
	String email

) {
	public static MemberDetailResponse of(Member member) {
		return MemberDetailResponse.builder()
			.nickname(member.getNickname())
			.profileImage(member.getProfileImage())
			.phoneNumber(member.getPhoneNumber())
			.email(member.getEmail())
			.memberId(member.getId())
			.build();
	}
}
