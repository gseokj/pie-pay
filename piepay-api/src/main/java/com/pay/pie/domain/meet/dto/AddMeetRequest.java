package com.pay.pie.domain.meet.dto;

import com.pay.pie.domain.meet.entity.Meet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
public class AddMeetRequest {
	private String meetName;
	private String meetImage;

	public Meet toEntity() {
		return Meet.builder()
			.meetName(meetName)
			.meetImage(meetImage)
			.build();
	}
}
