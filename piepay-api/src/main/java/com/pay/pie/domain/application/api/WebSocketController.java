package com.pay.pie.domain.application.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.application.PayAgreeService;
import com.pay.pie.domain.application.dto.AgreeDto;
import com.pay.pie.domain.application.dto.InsteadDto;
import com.pay.pie.domain.application.dto.request.PayEndReq;
import com.pay.pie.domain.application.dto.request.AgreeReq;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WebSocketController {

	private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketController.class);

	private final SimpMessageSendingOperations simpleMessageSendingOperations;
	private final RedisTemplate<String, Object> redisTemplate;
	private final PayAgreeService payAgreeService;
	private final SimpMessagingTemplate messagingTemplate;

	// 새로운 사용자가 웹 소켓을 연결할 때 실행됨
	// @EventListener은 한개의 매개변수만 가질 수 있다.
	// @EventListener
	// public void handleWebSocketConnectListener(SessionConnectEvent event) {
	// 	log.info("연결!");
	// 	StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
	// 	String sessionId = headerAccesor.getSessionId();
	// 	LOGGER.info("Received a new web socket connection : " + sessionId);
	// }
	//
	// 사용자가 웹 소켓 연결을 끊으면 실행됨
	// @EventListener
	// public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
	// 	StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
	// 	String sessionId = headerAccesor.getSessionId();
	//
	// 	LOGGER.info("sessionId Disconnected : " + sessionId);
	// }

	/**
	 * 연결 확인용
	 * @param message
	 * @return
	 */
	@MessageMapping("/channel")
	public String sendMessage(String message) {
		log.info("Received message: {}", message);
		simpleMessageSendingOperations.convertAndSend("/api/sub", "socket connection completed.");
		return message;
	}

	/**
	 * 방 입장 시 초기 정보 조회
	 * @param payId
	 * @param headerAccessor 초기 정보 리스트
	 */
	@MessageMapping("/initialData/{payId}")
	public void checkInitialData(@DestinationVariable String payId, SimpMessageHeaderAccessor headerAccessor) {
		Map<Object, Object> agreeTrueData = redisTemplate.opsForHash().entries("payId:" + payId + ":true");
		Map<Object, Object> agreeFalseData = redisTemplate.opsForHash().entries("payId:" + payId + ":false");

		Map<String, Object> agreeData = new HashMap<>();
		List<Integer> agreeTrueParticipantIds = new ArrayList<>();
		List<Integer> agreeFalseParticipantIds = new ArrayList<>();

		for (Map.Entry<Object, Object> entry : agreeTrueData.entrySet()) {
			agreeTrueParticipantIds.add(Integer.parseInt(entry.getValue().toString()));
		}
		for (Map.Entry<Object, Object> entry : agreeFalseData.entrySet()) {
			agreeFalseParticipantIds.add(Integer.parseInt(entry.getValue().toString()));
		}

		agreeData.put("agreeTrue", agreeTrueParticipantIds);
		agreeData.put("agreeFalse", agreeFalseParticipantIds);
		log.info("초기데이터: {}", agreeData);

		messagingTemplate.convertAndSend("/api/sub/initialData/" + payId, agreeData);
	}

	/**
	 * 결제 동의
	 * @param agreeReq
	 */
	@MessageMapping("/agree")
	public void respondToAgreement(AgreeReq agreeReq) {
		log.info("payId:{}", agreeReq.getPayId());
		AgreeDto agreeDto = payAgreeService.respondToAgreement(agreeReq);

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/api/sub/" + agreeReq.getPayId(), agreeDto);
		log.info("동의 성공");
	}

	/**
	 * 대신내주기 승낙
	 * @param insteadAgreeReq
	 */
	@MessageMapping("/instead-res")
	public void respondToPayInstead(InsteadDto insteadAgreeReq) {
		AgreeDto agreeDto = payAgreeService.respondToPayInstead(insteadAgreeReq);

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/api/sub/" + insteadAgreeReq.getPayId(), agreeDto);
	}

	/**
	 * 결제 완료 상태 전달
	 * @param payId
	 */
	@MessageMapping("/pay-end/{payId}")
	public void respondToComplete(@DestinationVariable String payId) {
		Long payEndId = Long.valueOf(payId);
		AgreeDto endPay = payAgreeService.respondToComplete(payEndId);

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/api/sub/" + payEndId, endPay);
	}
}
