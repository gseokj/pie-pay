package com.pay.pie.domain.memberMeet.dto;

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

	private Long memberId;
	private String meetInvitation;
	private Long meetId;

	public MemberMeet toEntity() {
		return MemberMeet.builder()
			.memberId(memberId)
			.meetId(meetId)
			.build();
	}
}
