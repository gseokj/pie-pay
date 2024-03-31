package com.pay.pie.domain.notification.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pay.pie.domain.notification.dto.EventPayload;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class SseEmitterService {
	// thread-safe 한 컬렉션 객체로 sse emitter 객체를 관리해야 한다.
	private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();
	private static final long TIMEOUT = 60 * 1000;
	private static final long RECONNECTION_TIMEOUT = 1000L;

	public SseEmitter subscribe(String id) {
		SseEmitter emitter = createEmitter();
		//연결 세션 timeout 이벤트 핸들러 등록
		emitter.onTimeout(() -> {
			log.info("server sent event timed out : id={}", id);
			//onCompletion 핸들러 호출
			emitter.complete();
		});

		//에러 핸들러 등록
		emitter.onError(e -> {
			log.info("server sent event error occurred : id={}, message={}", id, e.getMessage());
			//onCompletion 핸들러 호출
			emitter.complete();
		});

		//SSE complete 핸들러 등록
		emitter.onCompletion(() -> {
			if (emitterMap.remove(id) != null) {
				log.info("server sent event removed in emitter cache: id={}", id);
			}

			log.info("disconnected by completed server sent event: id={}", id);
		});

		emitterMap.put(id, emitter);

		//초기 연결시에 응답 데이터를 전송할 수도 있다.
		try {
			SseEmitter.SseEventBuilder event = SseEmitter.event()
				//event 명 (event: event example)
				.name("event example")
				//event id (id: id-1) - 재연결시 클라이언트에서 `Last-Event-ID` 헤더에 마지막 event id 를 설정
				.id(String.valueOf("id-1"))
				//event data payload (data: SSE connected)
				.data("SSE connected")
				//SSE 연결이 끊어진 경우 재접속 하기까지 대기 시간 (retry: <RECONNECTION_TIMEOUT>)
				.reconnectTime(RECONNECTION_TIMEOUT);
			emitter.send(event);
		} catch (IOException e) {
			log.error("failure send media position data, id={}, {}", id, e.getMessage());
		}
		return emitter;
	}

	public void broadcast(EventPayload eventPayload) {
		emitterMap.forEach((id, emitter) -> {
			try {
				emitter.send(SseEmitter.event()
					.name("broadcast event")
					.id("broadcast event 1")
					.reconnectTime(RECONNECTION_TIMEOUT)
					.data(eventPayload, MediaType.APPLICATION_JSON));
				log.info("sended notification, id={}, payload={}", id, eventPayload);
			} catch (IOException e) {
				//SSE 세션이 이미 해제된 경우
				log.error("fail to send emitter id={}, {}", id, e.getMessage());
			}
		});
	}

	private SseEmitter createEmitter() {
		return new SseEmitter(TIMEOUT);
	}
}
