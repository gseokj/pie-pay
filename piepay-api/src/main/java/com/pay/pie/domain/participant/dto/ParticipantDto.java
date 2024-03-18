package com.pay.pie.domain.participant.dto;

import com.pay.pie.domain.member.dto.SelectedMemberInfoDto;
import com.pay.pie.domain.participant.entity.Participant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ParticipantDto {

	private final Long id;
	private final SelectedMemberInfoDto memberInfo;
	private final Boolean isDrinkAlcohol;
	private final Boolean payAgree;

	public static ParticipantDto of(Participant participant) {
		return ParticipantDto.builder()
			.id(participant.getId())
			.memberInfo(SelectedMemberInfoDto.of(participant.getMember()))
			.isDrinkAlcohol(participant.getIsDrinkAlcohol())
			.payAgree(participant.getPayAgree())
			.build();
	}

}
