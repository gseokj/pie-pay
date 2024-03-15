package com.pay.pie.domain.memberMeet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.memberMeet.entity.MemberMeet;

public interface MemberMeetRepository extends JpaRepository<MemberMeet, Long> {
	List<MemberMeet> findByMeetId(Long meetId);
}
