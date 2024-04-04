package com.pay.pie.domain.meet.dto.request;

public record UpdateMeetNameRequest(
	Long meetId,
	String meetName
) {
}
