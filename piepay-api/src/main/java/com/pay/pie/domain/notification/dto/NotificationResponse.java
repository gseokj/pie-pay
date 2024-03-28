package com.pay.pie.domain.notification.dto;

import com.pay.pie.domain.notification.entity.Notification;

import lombok.Getter;

@Getter
public class NotificationResponse {

	private final Long notificationId;
	private final String message;
	private final boolean readOrNot;
	private final Long referenceId;

	public NotificationResponse(Notification notification) {
		this.notificationId = notification.getId();
		this.message = notification.getMessage();
		this.readOrNot = notification.getReadOrNot();
		this.referenceId = notification.getReferenceId();
	}

}
