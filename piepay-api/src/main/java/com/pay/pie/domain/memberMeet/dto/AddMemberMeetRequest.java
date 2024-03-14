package com.pay.pie.domain.memberMeet.dto;

import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddMemberMeetRequest {

	private Long memberId;
	private Long meetId;

	public MemberMeet toEntity() {
		// 여기서 초대코드를 meetId로 바꿔서 객체 만들기
		return MemberMeet.builder()
			.memberId(memberId)
			.meetId(meetId)
			.build();
	}
}
