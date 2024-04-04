package com.pay.pie.domain.meet.dto;

import com.pay.pie.domain.meet.entity.Meet;

import lombok.Getter;

@Getter
public class MeetStatusResponse {
	private final long meetId;
	private final String meetName;

	public MeetStatusResponse(Meet meet) {
		this.meetId = meet.getId();
		this.meetName = meet.getMeetName();
	}
}
