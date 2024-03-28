package com.pay.pie.domain.meet.dto;

import java.time.LocalDateTime;

import com.pay.pie.domain.meet.entity.Meet;

import lombok.Getter;

@Getter
public class MeetResponse {
	private final LocalDateTime createdAt;
	private final LocalDateTime updatedAt;
	private final String meetName;
	private final String meetImage;
	private final String meetInvitation;
	private final int membersCount;
	private final Long meetId;

	public MeetResponse(Meet meet, int membersCount) {

		this.meetName = meet.getMeetName();
		this.meetImage = meet.getMeetImage();
		this.meetInvitation = meet.getMeetInvitation();
		this.membersCount = membersCount;
		this.createdAt = meet.getCreatedAt();
		this.updatedAt = meet.getUpdatedAt();
		this.meetId = meet.getId();
	}
}
