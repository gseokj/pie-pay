package com.pay.pie.domain.meet.dto;

import com.pay.pie.domain.meet.entity.Meet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
public class AddMeetRequest {
	private String meetName;
	private String meetImage;
	private String meetInvitation;

	public Meet toEntity() {
		return Meet.builder()
			.meetName(meetName)
			.meetImage(meetImage)
			.build();
	}
}
