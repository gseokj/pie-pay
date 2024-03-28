package com.pay.pie.domain.notification.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.notification.entity.Notification;
import com.pay.pie.domain.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NotificationService {

	private final NotificationRepository notificationRepository;

	public List<Notification> findAllByMember(Member member) {
		return notificationRepository.findAllByMember(member);
	}

	public Notification findById(Long notificationId) {
		return notificationRepository.findById(notificationId).orElseThrow();
	}
}
