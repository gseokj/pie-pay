package com.pay.pie.domain.participant.dto;

import com.pay.pie.domain.member.dto.SelectedMemberInfoDto;
import com.pay.pie.domain.participant.entity.Participant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ParticipantInfoDto {

	private final Long participantId;
	private final SelectedMemberInfoDto memberInfo;
	private final Boolean isDrinkAlcohol;
	private final Boolean payAgree;
	private final Long payAmount;

	public static ParticipantInfoDto of(Participant participant) {
		return ParticipantInfoDto.builder()
			.participantId(participant.getId())
			.memberInfo(SelectedMemberInfoDto.of(participant.getMember()))
			.isDrinkAlcohol(participant.getIsDrinkAlcohol())
			.payAgree(participant.getPayAgree())
			.payAmount(participant.getPayAmount())
			.build();
	}
}
