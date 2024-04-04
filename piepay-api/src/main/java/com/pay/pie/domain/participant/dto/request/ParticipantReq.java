package com.pay.pie.domain.participant.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ParticipantReq {

	private Long memberId;
	private Boolean isDrinkAlcohol = true;

	// public Participant toEntity() {
	// 	Participant participant = Participant.builder()
	// 		.id(id)
	// 		.pay(pay)
	// 		.member(member)
	// 		.isDrinkAlcohol(())
	// }

}
