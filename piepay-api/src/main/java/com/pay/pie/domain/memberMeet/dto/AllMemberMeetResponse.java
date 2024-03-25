package com.pay.pie.domain.memberMeet.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

import lombok.Getter;

@Getter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 이 줄을 추가하여 Hibernate 프록시를 무시합니다.
public class AllMemberMeetResponse {

	// private final Member member;
	private final Meet meet;
	private final int memberCount;
	private final boolean isTopFixed;

	public AllMemberMeetResponse(MemberMeet memberMeet, int memberCount) {
		// this.member = memberMeet.getMember();
		this.meet = initializeAndUnproxy(memberMeet.getMeet());
		this.memberCount = memberCount;
		this.isTopFixed = memberMeet.isTopFixed();
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
