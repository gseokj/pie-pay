package com.pay.pie.domain.notification.dto;

import java.time.LocalDateTime;

import com.pay.pie.domain.notification.entity.Notification;

import lombok.Getter;

@Getter
public class NotificationResponse {

	private final Long notificationId;
	private final String message;
	private final boolean readOrNot;
	private final Long referenceId;
	private final LocalDateTime createdAt;

	public NotificationResponse(Notification notification) {
		this.notificationId = notification.getId();
		this.message = notification.getMessage();
		this.readOrNot = notification.getReadOrNot();
		this.referenceId = notification.getReferenceId();
		this.createdAt = notification.getCreatedAt();
	}

}
