package com.pay.pie.domain.member.dto;

import com.pay.pie.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class SelectedMemberInfoDto {

	private final Long id;
	private final String nickname;
	private final String profileImage;

	public static SelectedMemberInfoDto of(Member member) {
		return SelectedMemberInfoDto.builder()
			.id(member.getId())
			.nickname(member.getNickname())
			.profileImage(member.getProfileImage())
			.build();
	}
}
