package com.pay.pie.domain.meet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.meet.entity.Meet;

public interface MeetRepository extends JpaRepository<Meet, Long> {
	Optional<Meet> findByMeetInvitation(String meetInvitation);
}
