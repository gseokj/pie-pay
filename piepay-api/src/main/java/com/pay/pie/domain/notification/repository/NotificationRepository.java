package com.pay.pie.domain.notification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	List<Notification> findAllByMember(Member member);
}
