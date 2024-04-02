package com.pay.pie.domain.participant.dto.reponse;

import java.time.LocalDateTime;

import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.store.dto.StoreInfoDto;
import com.pay.pie.domain.store.entity.Store;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MyParticipantResponse {
	Long participantId;
	Long payId;
	boolean isDrinkAlcohol;
	Long payAmount;
	LocalDateTime updatedAt;
	StoreInfoDto store;

	public static MyParticipantResponse of(Participant participant, Store store) {
		return MyParticipantResponse.builder()
			.participantId(participant.getId())
			.payId(participant.getPay().getId())
			.isDrinkAlcohol(participant.getIsDrinkAlcohol())
			.payAmount(participant.getPayAmount())
			.updatedAt(participant.getUpdatedAt())
			.store(StoreInfoDto.of(store))
			.build();
	}
}
