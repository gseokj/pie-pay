package com.pay.pie.domain.memberMeet.dto;

import com.pay.pie.domain.meet.dto.MeetResponse;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.Getter;

@Getter
public class MemberMeetResponse {

	// private final Member member;
	private final MeetResponse meet;
	// private final int memberCount;

	public MemberMeetResponse(MemberMeet memberMeet, int memberCount) {
		// this.member = memberMeet.getMember();
		this.meet = new MeetResponse(memberMeet.getMeet(), memberCount);
		// this.memberCount = memberCount;
	}
}
