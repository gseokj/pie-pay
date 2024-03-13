package com.pay.pie.domain.participant.dto.request;

import com.pay.pie.domain.member.entity.Member;

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

	private Long id;
	private Member member;
	private Boolean isDrinkAlcohol = true;

	// public Participant toEntity() {
	// 	Participant participant = Participant.builder()
	// 		.id(id)
	// 		.pay(pay)
	// 		.member(member)
	// 		.isDrinkAlcohol(())
	// }

}
