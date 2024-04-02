package com.pay.pie.domain.participant.dto;

import com.pay.pie.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberParticipationCount {

	private Member member;
	private Long participantCount;

}
