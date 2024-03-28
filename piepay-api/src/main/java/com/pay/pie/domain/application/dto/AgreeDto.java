package com.pay.pie.domain.application.dto;

import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class AgreeDto {

	private final Long payId;
	private final Long participantId;
	private final boolean payAgree;
	private final Pay.PayStatus payStatus;
	// private final LocalDateTime agreeTime;

	public static AgreeDto of(Participant participant) {
		return AgreeDto.builder()
			.payId(participant.getPay().getId())
			.participantId(participant.getId())
			.payAgree(participant.getPayAgree())
			.payStatus(participant.getPay().getPayStatus())
			// .agreeTime(LocalDateTime.now())
			.build();
	}

}
