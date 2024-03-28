package com.pay.pie.domain.notification.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.member.application.MemberServiceImpl;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.notification.dto.NotificationResponse;
import com.pay.pie.domain.notification.entity.Notification;
import com.pay.pie.domain.notification.service.NotificationService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class NotificationApiController {

	private final NotificationService notificationService;
	private final MemberServiceImpl memberService;

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/notifications")
	public ResponseEntity<BaseResponse<List<NotificationResponse>>> findAllByMember(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Member member = memberService.findMemberById(securityUserDto.getMemberId());
		List<NotificationResponse> notifications = notificationService.findAllByMember(member)
			.stream()
			.peek(notification -> System.out.println("Notification ID: " + notification.getMessage()))
			.map(NotificationResponse::new)
			.toList();

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			notifications
		);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/notifications/{notificationId}")
	public ResponseEntity<BaseResponse<NotificationResponse>> findAllByMember(@PathVariable Long notificationId) {
		Notification notification = notificationService.findById(notificationId);
		NotificationResponse notificationResponse = new NotificationResponse(notification);

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			notificationResponse
		);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/notifications/existence")
	public ResponseEntity<BaseResponse<Long>> checkUnreadNotifications(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Member member = memberService.findMemberById(securityUserDto.getMemberId());
		Long unreadNotification = notificationService.findAllByMember(member)
			.stream()
			.filter(notification -> !notification.getReadOrNot())
			.count();

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			unreadNotification
		);
	}
}
