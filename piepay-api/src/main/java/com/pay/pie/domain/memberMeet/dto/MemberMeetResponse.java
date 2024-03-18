package com.pay.pie.domain.memberMeet.dto;

import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.Getter;

@Getter
public class MemberMeetResponse {

	// private final Member member;
	private final Long meetId;

	public MemberMeetResponse(MemberMeet memberMeet) {
		// this.member = memberMeet.getMemberId();
		this.meetId = memberMeet.getMeetId();
	}
}
