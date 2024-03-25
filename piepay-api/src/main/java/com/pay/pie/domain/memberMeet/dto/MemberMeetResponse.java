package com.pay.pie.domain.memberMeet.dto;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.Getter;

@Getter
public class MemberMeetResponse {

	private final Member member;
	private final Meet meet;
	private final int memberCount;

	public MemberMeetResponse(MemberMeet memberMeet, int memberCount) {
		this.member = memberMeet.getMember();
		this.meet = memberMeet.getMeet();
		this.memberCount = memberCount;
	}
}
