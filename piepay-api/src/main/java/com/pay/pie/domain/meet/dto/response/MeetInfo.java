package com.pay.pie.domain.meet.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.Builder;

@Builder
public record MeetInfo(
	String meetName,
	String meetImage,
	Long meetId,
	int membersCount,
	List<MeetMember> member,
	LocalDateTime lastPayDate,
	LocalDateTime createdAt,
	boolean topFixed
) {

	public static MeetInfo lastPayMeetInfo(Meet meet, Member findMember, LocalDateTime lastPayDate) {
		return MeetInfo.builder()
			.meetId(meet.getId())
			.meetName(meet.getMeetName())
			.meetImage(meet.getMeetImage())
			.membersCount(meet.getMemberMeetList().size())
			.member(meet.getMemberMeetList().stream()
				.map(member -> new MeetMember(member.getMember().getProfileImage()))
				.toList()
			)
			.topFixed(checkTopFixed(meet, findMember))
			.lastPayDate(lastPayDate)
			.build();
	}

	public static MeetInfo createMeetInfo(Meet meet, Member findMember) {
		return MeetInfo.builder()
			.meetId(meet.getId())
			.meetName(meet.getMeetName())
			.meetImage(meet.getMeetImage())
			.membersCount(meet.getMemberMeetList().size())
			.member(meet.getMemberMeetList().stream()
				.map(member -> new MeetMember(member.getMember().getProfileImage()))
				.toList()
			)
			.topFixed(checkTopFixed(meet, findMember))
			.createdAt(meet.getCreatedAt())
			.build();
	}


	public static boolean checkTopFixed(Meet meet, Member member) {
		List<MemberMeet> memberMeetList = meet.getMemberMeetList();
		for (MemberMeet memberMeet : memberMeetList) {
			if (Objects.equals(memberMeet.getMember(), member)) {
				return memberMeet.isTopFixed();
			}
		}
		return false;
	}

}
