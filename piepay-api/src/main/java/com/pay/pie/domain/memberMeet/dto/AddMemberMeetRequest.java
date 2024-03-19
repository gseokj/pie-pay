package com.pay.pie.domain.memberMeet.dto;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddMemberMeetRequest {

	private Member member;
	private String meetInvitation;
	private Meet meet;
	private Long memberId;

	public MemberMeet toEntity() {
		return MemberMeet.builder()
			.member(member)
			.meet(meet)
			.build();
	}
}
