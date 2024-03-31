package com.pay.pie.domain.notification.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.notification.entity.Notification;
import com.pay.pie.domain.notification.repository.EmitterRepository;
import com.pay.pie.domain.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationService {

	private final NotificationRepository notificationRepository;
	private final EmitterRepository emitterRepository;
	private final static Long DEFAULT_TIMEOUT = 3600000L;  // 기본 타임아웃
	private final static String NOTIFICATION_NAME = "notify"; // 이벤트 이름

	public List<Notification> findAllByMember(Member member) {
		return notificationRepository.findAllByMember(member);
	}

	public Notification findById(Long notificationId) {
		return notificationRepository.findById(notificationId).orElseThrow();
	}

	/*
	알림 보내기
	 */
	public SseEmitter connectNotification(Long memberId) {
		// 새로운 SseEmitter를 만든다
		SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

		// 유저 ID로 SseEmitter를 저장한다.
		emitterRepository.save(memberId, sseEmitter);

		// 세션이 종료될 경우 저장한 SseEmitter를 삭제한다.
		sseEmitter.onCompletion(() -> emitterRepository.delete(memberId));
		sseEmitter.onTimeout(() -> emitterRepository.delete(memberId));

		// 503 Service Unavailable 오류가 발생하지 않도록 첫 데이터를 보낸다.
		// try {
		// 	sseEmitter.send(SseEmitter.event().id("").name(NOTIFICATION_NAME).data("Connection completed"));
		// } catch (IOException exception) {
		// 	throw new IllegalArgumentException("클라이언트에게 연결이 성공하지 못했습니다.");
		// }
		return sseEmitter;
	}

	// public void send(Long userId, Long notificationId) {
	// 	// 유저 ID로 SseEmitter를 찾아 이벤트를 발생 시킨다.
	// 	emitterRepository.get(userId).ifPresentOrElse(sseEmitter -> {
	// 		try {
	// 			sseEmitter.send(
	// 				SseEmitter.event().id(notificationId.toString()).name(NOTIFICATION_NAME).data("New notification"));
	// 		} catch (IOException exception) {
	// 			// IOException이 발생하면 저장된 SseEmitter를 삭제하고 예외를 발생시킨다.
	// 			emitterRepository.delete(userId);
	// 			throw new IllegalArgumentException("클라이언트에게 연결이 성공하지 못했습니다.");
	// 		}
	// 	}, () -> log.info("No emitter found"));
	// }

}
