package com.pay.pie.domain.notification.controller;

import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.pay.pie.domain.notification.dto.EventPayload;
import com.pay.pie.domain.notification.service.SseEmitterService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sse")
public class SSEController {

	private final SseEmitterService sseEmitterService;

	//응답 mime type 은 반드시 text/event-stream 이여야 한다.
	//클라이언트로 부터 SSE subscription 을 수락한다.
	@GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<SseEmitter> subscribe() {
		String sseId = UUID.randomUUID().toString();
		SseEmitter emitter = sseEmitterService.subscribe(sseId);
		return ResponseEntity.ok(emitter);
	}

	//eventPayload 를 SSE 로 연결된 모든 클라이언트에게 broadcasting 한다.
	@PostMapping("/broadcast")
	public ResponseEntity<Void> broadcast(@RequestBody EventPayload eventPayload) {
		sseEmitterService.broadcast(eventPayload);
		return ResponseEntity.ok().build();
	}

	// /**
	//  * 로그인 한 유저 sse 연결
	//  */
	// public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();
	//
	// @GetMapping(value = "/sub", produces = "text/event-stream")
	// public SseEmitter subscribe(@AuthenticationPrincipal SecurityUserDto securityUserDto,
	// 	@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
	// 	log.info("securityUserDto: {}", securityUserDto);
	// 	Long memberId = securityUserDto.getMemberId();
	//
	// 	SseEmitter sseEmitter = notificationService.subscribe(memberId);
	//
	// 	return sseEmitter;
	// }
	// @GetMapping(value = "/subscribe", produces = "text/event-stream")
	// public SseEmitter subscribe(
	// 	@AuthenticationPrincipal SecurityUserDto securityUserDto,
	// 	@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
	// 	log.info("lastEvent: {}", lastEventId);
	// 	Long memberId = securityUserDto.getMemberId();
	// 	log.info("로그인 memeberId: {}", memberId);
	// 	return notificationService.subscribe(memberId, lastEventId);
	// }

	// /**
	//  * 모임에 속한 모든 회원의 SSE 연결
	//  * @param meetId
	//  * @return
	//  */
	// @GetMapping(value = "/subscribe/{meetId}", produces = "text/event-stream")
	// public List<SseEmitter> subscribeAllMembers(@PathVariable Long meetId) {
	// 	// 서비스를 통해 모임에 속한 모든 회원의 SSE 연결을 설정합니다.
	// 	return notificationService.subscribeAllMembers(meetId);
	// }

	// @GetMapping("/subscribe")
	// public List<SseEmitter> subscribe(@AuthenticationPrincipal SecurityUserDto securityUserDto) {
	// 	// Authentication을 UserDto로 업캐스팅
	// 	Long memberId = securityUserDto.getMemberId();
	//
	// 	// 서비스를 통해 생성된 SseEmitter를 반환
	// 	return notificationService.subscribe(memberId);
	// }
}
