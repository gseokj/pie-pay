package com.pay.pie.domain.memberMeet.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JoinMeetResult {

	private boolean result;
	private Long meetId;

}
