package com.pay.pie.domain.meet.dto.response;

import java.util.List;

import com.pay.pie.domain.meet.dto.MeetPaymentInfo;
import com.pay.pie.domain.meet.dto.MonthInfo;
import com.pay.pie.domain.member.dto.response.MemberDetailResponse;
import com.pay.pie.domain.participant.dto.MemberParticipationCount;

import lombok.Builder;

@Builder
public record MeetHighlightResponse(
	Long totalMeetCount,
	Long totalPayment,
	Double averagePayment,
	MemberDetailResponse mostAttendingMember,
	Long memberAttendingCount,
	Long drinkCount,
	List<MonthInfo> monthInfos

) {

	public static MeetHighlightResponse of(
		MeetPaymentInfo meetPaymentInfo,
		Long drinkCount,
		MemberParticipationCount memberParticipationCount,
		List<MonthInfo> monthInfos
	) {

		return MeetHighlightResponse.builder()
			.totalMeetCount(meetPaymentInfo.getTotalMeetCount())
			.totalPayment(meetPaymentInfo.getTotalPayment())
			.averagePayment(meetPaymentInfo.getAveragePayment())
			.mostAttendingMember(MemberDetailResponse.of(memberParticipationCount.getMember()))
			.memberAttendingCount(memberParticipationCount.getParticipantCount())
			.drinkCount(drinkCount)
			.monthInfos(monthInfos)
			.build();
	}

}
