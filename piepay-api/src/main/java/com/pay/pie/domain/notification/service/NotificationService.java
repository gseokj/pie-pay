package com.pay.pie.domain.notification.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.notification.entity.Notification;
import com.pay.pie.domain.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationService {

	private final NotificationRepository notificationRepository;

	public List<Notification> findAllByMember(Member member) {
		return notificationRepository.findAllByMemberOrderByCreatedAtDesc(member);
	}

	public Notification findById(Long notificationId) {
		return notificationRepository.findById(notificationId).orElseThrow();
	}
	
}
