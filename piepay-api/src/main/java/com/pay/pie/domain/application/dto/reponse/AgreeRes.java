package com.pay.pie.domain.application.dto.reponse;

import java.time.LocalDateTime;

import com.pay.pie.domain.participant.entity.Participant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class AgreeRes {

	private final Long payId;
	private final Long participantId;
	private final boolean payAgree;
	private final LocalDateTime createdAt;

	public static AgreeRes of(Participant participant) {
		return AgreeRes.builder()
			.payId(participant.getPay().getId())
			.participantId(participant.getId())
			.payAgree(participant.getPayAgree())
			.createdAt(participant.getPay().getCreatedAt())
			.build();
	}
}
