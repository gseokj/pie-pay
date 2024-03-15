package com.pay.pie.domain.memberMeet.dto;

import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.Getter;

@Getter
public class MemberMeetResponse {

	private final Long memberId;
	private final Long meetId;

	public MemberMeetResponse(MemberMeet memberMeet) {
		this.memberId = memberMeet.getMemberId();
		this.meetId = memberMeet.getMeetId();
	}
}
