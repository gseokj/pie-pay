package com.pay.pie.domain.memberMeet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddMemberMeetRequest {

	// private Member member;
	private String meetInvitation;
	// private Meet meet;
	// private Long memberId;

	// public MemberMeet toEntity() {
	// 	return MemberMeet.builder()
	// 		.member(member)
	// 		.meet(meet)
	// 		.build();
	// }
}
