package com.pay.pie.domain.memberMeet.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pay.pie.domain.meet.dto.MeetResponse;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import com.pay.pie.domain.pay.entity.Pay;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 이 줄을 추가하여 Hibernate 프록시를 무시합니다.
public class AllMemberMeetResponse {

	// private final Member member;
	private final MeetResponse meet;
	// private final int memberCount;
	private final boolean isTopFixed;
	private final LocalDateTime updated_at;

	public AllMemberMeetResponse(MemberMeet memberMeet, int memberCount, LocalDateTime latestUpdateOnMeet) {
		this.meet = new MeetResponse(memberMeet.getMeet(), memberCount);
		// this.meetResponse = initializeAndUnproxy(memberMeet.getMeet());
		// this.memberCount = memberCount;
		this.isTopFixed = memberMeet.isTopFixed();
		this.updated_at = latestUpdateOnMeet;
	}

	// Hibernate 프록시를 초기화하여 엔티티로 변환하는 메서드
	private Meet initializeAndUnproxy(Meet meet) {
		if (meet == null) {
			throw new IllegalArgumentException("Meet 엔티티는 null일 수 없습니다.");
		}
		if (meet instanceof org.hibernate.proxy.HibernateProxy) {
			// Hibernate 프록시를 초기화하여 실제 엔티티로 변환합니다.
			org.hibernate.Hibernate.initialize(meet);
			meet = (Meet)((org.hibernate.proxy.HibernateProxy)meet).getHibernateLazyInitializer()
				.getImplementation();
		}
		return meet;
	}

	public boolean isTopFixed() {
		return isTopFixed;
	}
}
