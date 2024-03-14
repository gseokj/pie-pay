package com.pay.pie.domain.memberMeet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.memberMeet.entity.MemberMeet;

public interface MemberMeetRepository extends JpaRepository<MemberMeet, Long> {
}
