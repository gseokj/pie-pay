package com.pay.pie.domain.participant.dto.reponse;

import com.pay.pie.domain.member.dto.SelectedMemberInfoDto;
import com.pay.pie.domain.participant.entity.Participant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ParticipantRes {

	private final Long id;
	private final Long payId;
	private final SelectedMemberInfoDto memberInfo;
	private final Boolean isDrinkAlcohol;
	private final Boolean payAgree;

	public static ParticipantRes of(Participant participant) {
		return ParticipantRes.builder()
			.id(participant.getId())
			.payId(participant.getPay().getId())
			.memberInfo(SelectedMemberInfoDto.of(participant.getMember()))
			.isDrinkAlcohol(participant.getIsDrinkAlcohol())
			.payAgree(participant.getPayAgree())
			.build();
	}
	
}
