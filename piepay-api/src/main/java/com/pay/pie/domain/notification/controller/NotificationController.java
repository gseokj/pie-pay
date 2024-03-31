package com.pay.pie.domain.notification.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pay.pie.domain.member.application.MemberService;
import com.pay.pie.domain.notification.service.NotificationService;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

	private final MemberService memberService;
	private final NotificationService notificationService;

	@GetMapping("/subscribe")
	public SseEmitter subscribe(@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		// Authentication을 UserDto로 업캐스팅
		Long memberId = securityUserDto.getMemberId();

		// 서비스를 통해 생성된 SseEmitter를 반환
		return notificationService.connectNotification(memberId);
	}
}
