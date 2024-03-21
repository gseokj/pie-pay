package com.pay.pie.domain.participant.dto;

import com.pay.pie.domain.member.dto.SelectedMemberInfoDto;
import com.pay.pie.domain.participant.entity.Participant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class CompletedPaymentParticipantDto {

	private final Long participantId;
	private final SelectedMemberInfoDto memberInfo;
	private final Boolean isDrinkAlcohol;
	private final Boolean payAgree;
	private final Long payAmount;

	public static CompletedPaymentParticipantDto of(Participant participant) {
		return CompletedPaymentParticipantDto.builder()
			.participantId(participant.getId())
			.memberInfo(SelectedMemberInfoDto.of(participant.getMember()))
			.isDrinkAlcohol(participant.getIsDrinkAlcohol())
			.payAgree(participant.getPayAgree())
			.payAmount(participant.getPayAmount())
			.build();
	}
}
