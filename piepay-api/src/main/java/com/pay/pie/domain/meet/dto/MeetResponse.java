package com.pay.pie.domain.meet.dto;

import com.pay.pie.domain.meet.entity.Meet;

import lombok.Getter;

@Getter
public class MeetResponse {

	private final String meetName;
	private final String meetImage;
	private final String meetInvitation;

	public MeetResponse(Meet meet) {
		this.meetName = meet.getMeetName();
		this.meetImage = meet.getMeetImage();
		this.meetInvitation = meet.getMeetInvitation();
	}
}
