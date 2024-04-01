package com.pay.pie.domain.notification.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.notification.dto.EventMessage;
import com.pay.pie.domain.notification.dto.EventPayload;
import com.pay.pie.domain.notification.entity.Notification;
import com.pay.pie.domain.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class SseEmitterService {

	private final MemberRepository memberRepository;
	private final NotificationRepository notificationRepository;
	// thread-safe 한 컬렉션 객체로 sse emitter 객체를 관리해야 한다.
	private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();
	private static final long TIMEOUT = 3600000L;
	private static final long RECONNECTION_TIMEOUT = 1000L;

	public SseEmitter subscribe(String sseId) {
		SseEmitter emitter = createEmitter();
		//연결 세션 timeout 이벤트 핸들러 등록
		emitter.onTimeout(() -> {
			log.info("server sent event timed out : id={}", sseId);
			//onCompletion 핸들러 호출
			emitter.complete();
		});

		//에러 핸들러 등록
		emitter.onError(e -> {
			log.info("server sent event error occurred : id={}, message={}", sseId, e.getMessage());
			//onCompletion 핸들러 호출
			emitter.complete();
		});

		//SSE complete 핸들러 등록
		emitter.onCompletion(() -> {
			if (emitterMap.remove(sseId) != null) {
				log.info("server sent event removed in emitter cache: id={}", sseId);
			}

			log.info("disconnected by completed server sent event: id={}", sseId);
		});

		emitterMap.put(sseId, emitter);

		//초기 연결시에 응답 데이터를 전송할 수도 있다.
		try {
			SseEmitter.SseEventBuilder event = SseEmitter.event()
				//event 명 (event: event example)
				.name("connected")
				//event id (id: id-1) - 재연결시 클라이언트에서 `Last-Event-ID` 헤더에 마지막 event id 를 설정
				.id(String.valueOf("id-" + System.currentTimeMillis()))
				//event data payload (data: SSE connected)
				.data("SSE connected")
				//SSE 연결이 끊어진 경우 재접속 하기까지 대기 시간 (retry: <RECONNECTION_TIMEOUT>)
				.reconnectTime(RECONNECTION_TIMEOUT);
			emitter.send(event);
		} catch (IOException e) {
			log.error("failure send media position data, id={}, {}", sseId, e.getMessage());
		}
		return emitter;
	}

	public void broadcast(EventPayload eventPayload) {
		String message = eventPayload.message().toString();
		emitterMap.forEach((id, emitter) -> {
			log.info("sse broadcast 시작!");
			try {
				SseEmitter.SseEventBuilder event = SseEmitter.event()
					.name("[알림]")
					.id(String.valueOf(System.currentTimeMillis()))
					.data(message, MediaType.TEXT_PLAIN)
					.reconnectTime(RECONNECTION_TIMEOUT);
				emitter.send(event);
				log.info("sended notification, id={}, payload={}", id, eventPayload);
			} catch (IOException e) {
				//SSE 세션이 이미 해제된 경우
				log.error("fail to send emitter id={}, {}", id, e.getMessage());
			}
		});
	}

	public void sendNotification(Long memberId, EventMessage message) {
		// 동의 알람 이벤트 생성
		EventPayload eventPayload = new EventPayload(memberId, message);
		log.info("eventPayload.memberId(): {}", eventPayload.memberId());
		log.info("eventPayload.message(): {}", eventPayload.message());
		// 동의 알람을 받는 구독자에게 SSE 알림 전송
		broadcast(eventPayload);
		log.info("broadcast 완료!");
		// Notification 저장
		saveNotification(memberId, message);
		log.info("notification 저장완료!");
	}

	private void saveNotification(Long memberId, EventMessage message) {
		// Notification 엔터티에 알림 저장
		Notification notification = new Notification();
		notification.setMember(memberRepository.findById(memberId)
			.orElseThrow(() -> new IllegalArgumentException("해당 멤버가 존재하지 않습니다.")));
		notification.setMessage(message.toString());
		notification.setReadOrNot(false); // 읽지 않은 상태로
		notification.setReferenceId(0L); // 참조 ID
		notificationRepository.save(notification);
		log.info("Notification saved for memberId={}, message={}", memberId, message);
	}

	private SseEmitter createEmitter() {
		return new SseEmitter(TIMEOUT);
	}
}
