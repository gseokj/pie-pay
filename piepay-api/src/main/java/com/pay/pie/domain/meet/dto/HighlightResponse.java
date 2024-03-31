package com.pay.pie.domain.meet.dto;

import lombok.Getter;

@Getter
public class HighlightResponse {
	private final MeetResponse meet;

	public HighlightResponse(MeetResponse meet) {
		this.meet = meet;
	}
}
