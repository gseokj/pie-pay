package com.pay.pie.domain.meet.dto;

import java.time.LocalDateTime;

import com.pay.pie.domain.meet.entity.Meet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MeetDto {
	private final LocalDateTime createdAt;
	private final LocalDateTime updateAt;
	private final Long id;
	private final String meetName;
	private final String meetImage;
	private final String meetInvitation;

	public static MeetDto of(Meet meet) {
		return MeetDto.builder()
			.id(meet.getId())
			.createdAt(meet.getCreatedAt())
			.updateAt(meet.getUpdatedAt())
			.meetName(meet.getMeetName())
			.meetImage(meet.getMeetImage())
			.meetInvitation(meet.getMeetInvitation())
			.build();

	}
}
