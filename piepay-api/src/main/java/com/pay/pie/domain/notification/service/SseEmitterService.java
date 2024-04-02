package com.pay.pie.domain.notification.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pay.pie.domain.member.dao.MemberRepository;
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
	private final Map<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();
	private static final long TIMEOUT = 3600000L;
	private static final long RECONNECTION_TIMEOUT = 1000L;

	public SseEmitter subscribe(Long memberId) {
		SseEmitter emitter = createEmitter();
		log.info("emitter: {}", emitter);
		//연결 세션 timeout 이벤트 핸들러 등록 -연결이 끊어질 때 알림
		emitter.onTimeout(() -> {
			log.info("server sent event timed out : id={}", memberId);
			//onCompletion 핸들러 호출
			emitter.complete();
		});

		//에러 핸들러 등록 -연결이 끊어질 때 알림
		emitter.onError(e -> {
			log.info("server sent event error occurred : id={}, message={}", memberId, e.getMessage());
			//onCompletion 핸들러 호출
			emitter.complete();
		});

		//SSE complete 핸들러 등록 -연결이 완료될 때 후속 작업
		emitter.onCompletion(() -> {
			log.info("memberId: {}", memberId);
			if (emitterMap.remove(memberId) != null) {
				log.info("server sent event removed in emitter cache: id={}", memberId);
			}

			log.info("disconnected by completed server sent event: id={}", memberId);
		});

		emitterMap.put(memberId, emitter);

		//초기 연결시에 응답 데이터를 전송할 수도 있다.
		try {
			SseEmitter.SseEventBuilder event = SseEmitter.event()
				//event 명 (event: event example)
				.name("connected")
				//event id (id: id-1) - 재연결시 클라이언트에서 `Last-Event-ID` 헤더에 마지막 event id 를 설정
				.id(String.valueOf("id-" + System.currentTimeMillis()))
				//event data payload (data: SSE connected) -503에러 방지 더미데이터
				.data("SSE connected")
				//SSE 연결이 끊어진 경우 재접속 하기까지 대기 시간 (retry: <RECONNECTION_TIMEOUT>)
				.reconnectTime(RECONNECTION_TIMEOUT);
			emitter.send(event);
		} catch (IOException e) {
			log.error("failure send media position data, id={}, {}", memberId, e.getMessage());
		}
		return emitter;
	}

	public void broadcast(EventPayload eventPayload) {
		Long targetMemberId = eventPayload.memberId();
		log.info("targetMemberId: {}", targetMemberId);
		Long referenceId = eventPayload.referenceId();
		String message = eventPayload.message();
		String noti;

		// referenceId에 따라 다른 알림
		noti = switch (referenceId.intValue()) {
			case 1 -> "결제 : " + message;
			case 2 -> "결제 동의 : " + message;
			case 3 -> "대신 내주기 : " + message;
			case 4 -> "대신 내주기 정산: " + message;
			default -> "기타 메시지: " + message;
		};
		emitterMap.forEach((id, emitter) -> {
			// 특정 멤버 ID에 해당하는 사용자에게만 알림을 보냄
			if (id.equals(targetMemberId)) {
				log.info("sse broadcast 시작!");
				try {
					SseEmitter.SseEventBuilder event = SseEmitter.event()
						.name("[알림]")
						.id(String.valueOf(System.currentTimeMillis()))
						.data(noti, MediaType.TEXT_PLAIN)
						.reconnectTime(RECONNECTION_TIMEOUT);
					emitter.send(event);
					log.info("sended notification, id={}, payload={}", id, eventPayload);
				} catch (IOException e) {
					// SSE 세션이 이미 해제된 경우
					log.error("fail to send emitter id={}, {}", id, e.getMessage());
				}
			}
		});
	}

	public void sendNotification(Long memberId, Long referenceId, String message) {
		// 동의 알람 이벤트 생성
		EventPayload eventPayload = new EventPayload(memberId, referenceId, message);
		log.info("eventPayload.memberId(): {}", eventPayload.memberId());
		log.info("eventPayload.referenceId(): {}", eventPayload.referenceId());
		log.info("eventPayload.message(): {}", eventPayload.message());
		// 동의 알람을 받는 구독자에게 SSE 알림 전송
		broadcast(eventPayload);
		log.info("broadcast 완료!");
		// Notification 저장
		saveNotification(memberId, referenceId, message);
		log.info("notification 저장완료!");
	}

	private void saveNotification(Long memberId, Long referenceId, String message) {
		// Notification 엔터티에 알림 저장
		Notification notification = new Notification();
		notification.setMember(memberRepository.findById(memberId)
			.orElseThrow(() -> new IllegalArgumentException("해당 멤버가 존재하지 않습니다.")));
		notification.setMessage(message);
		notification.setReadOrNot(false); // 읽지 않은 상태로
		notification.setReferenceId(referenceId); // 참조 ID
		notificationRepository.save(notification);
		log.info("Notification saved for memberId={}, referenceId={} ,message={}", memberId, referenceId, message);
	}

	private SseEmitter createEmitter() {
		return new SseEmitter(TIMEOUT);
	}
}
