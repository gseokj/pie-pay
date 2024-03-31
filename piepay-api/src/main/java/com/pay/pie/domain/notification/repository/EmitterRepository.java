package com.pay.pie.domain.notification.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class EmitterRepository {
	// 유저ID를 키로 SseEmitter를 해시맵에 저장할 수 있도록 구현했다.
	private Map<String, SseEmitter> emitterMap = new HashMap<>();

	public SseEmitter save(Long memberId, SseEmitter sseEmitter) {
		emitterMap.put(getKey(memberId), sseEmitter);
		log.info("Saved SseEmitter for {}", memberId);
		return sseEmitter;
	}

	public Optional<SseEmitter> get(Long memberId) {
		log.info("Got SseEmitter for {}", memberId);
		return Optional.ofNullable(emitterMap.get(getKey(memberId)));
	}

	public void delete(Long memberId) {
		emitterMap.remove(getKey(memberId));
		log.info("Deleted SseEmitter for {}", memberId);
	}

	private String getKey(Long memberId) {
		return "Emitter:UID:" + memberId;
	}
}
