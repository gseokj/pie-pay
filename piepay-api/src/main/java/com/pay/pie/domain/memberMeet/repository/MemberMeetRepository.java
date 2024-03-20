package com.pay.pie.domain.memberMeet.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;

public interface MemberMeetRepository extends JpaRepository<MemberMeet, Long> {
	List<MemberMeet> findByMeetId(Long meetId);

	List<MemberMeet> findByMemberId(Long memberId);

	Optional<MemberMeet> findByMeetAndMember(Meet meet, Member member);
}
