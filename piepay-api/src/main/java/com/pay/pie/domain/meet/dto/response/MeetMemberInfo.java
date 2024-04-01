package com.pay.pie.domain.meet.dto.response;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.participant.dto.ParticipantStatistics;

import lombok.Builder;

@Builder
public record MeetMemberInfo(
	Long memberId,
	String nickname,
	String profileImage,
	long payCount,
	long payTotal

) {

	public static MeetMemberInfo of(Member member, ParticipantStatistics participantStatistics) {

		return MeetMemberInfo.builder()
			.memberId(member.getId())
			.nickname(member.getNickname())
			.profileImage(member.getProfileImage())
			.payCount(participantStatistics.getPayCount())
			.payTotal(participantStatistics.getPayTotal())
			.build();
	}

}
