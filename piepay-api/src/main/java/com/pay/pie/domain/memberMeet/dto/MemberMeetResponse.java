package com.pay.pie.domain.memberMeet.dto;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.Getter;

@Getter
public class MemberMeetResponse {

	// private final Member member;
	private final Meet meet;

	public MemberMeetResponse(MemberMeet memberMeet) {
		// this.member = memberMeet.getMemberId();
		this.meet = memberMeet.getMeet();
	}
}
