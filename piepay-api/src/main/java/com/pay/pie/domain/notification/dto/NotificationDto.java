package com.pay.pie.domain.notification.dto;

import lombok.Builder;

@Builder
public record NotificationDto(
	Long memberId,
	String message,
	Long referenceId,
	Long destinationId) {
}
