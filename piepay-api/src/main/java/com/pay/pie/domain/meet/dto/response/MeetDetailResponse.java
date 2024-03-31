package com.pay.pie.domain.meet.dto.response;

import java.time.LocalDateTime;

import com.pay.pie.domain.meet.entity.Meet;

import lombok.Builder;

@Builder
public record MeetDetailResponse(

	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	String meetName,
	String meetImage,
	String meetInvitation,
	int memberCount,
	Long meetId
) {

	public static MeetDetailResponse of(Meet meet, int memberCount) {

		return MeetDetailResponse.builder()
			.createdAt(meet.getCreatedAt())
			.updatedAt(meet.getUpdatedAt())
			.meetName(meet.getMeetName())
			.meetImage(meet.getMeetImage())
			.meetInvitation(meet.getMeetInvitation())
			.memberCount(memberCount)
			.meetId(meet.getId())
			.build();
	}

}
