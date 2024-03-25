package com.pay.pie.domain.application.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.pay.pie.domain.application.PayAgreeService;
import com.pay.pie.domain.application.PayInsteadService;
import com.pay.pie.domain.application.dto.reponse.AgreeRes;
import com.pay.pie.domain.application.dto.reponse.InsteadRes;
import com.pay.pie.domain.application.dto.request.AgreeReq;
import com.pay.pie.domain.application.dto.request.InsteadAgreeReq;
import com.pay.pie.domain.application.dto.request.InsteadRequestReq;
import com.pay.pie.domain.participant.application.ParticipantService;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
// @RequestMapping
@RequiredArgsConstructor
public class WebSocketController {

	private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketController.class);

	private final SimpMessageSendingOperations simpleMessageSendingOperations;
	private final ParticipantService participantService;
	private final PayAgreeService payAgreeService;
	private final SimpMessagingTemplate messagingTemplate;
	private final PayInsteadService payInsteadService;

	// 새로운 사용자가 웹 소켓을 연결할 때 실행됨
	// @EventListener은 한개의 매개변수만 가질 수 있다.
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
		log.info("연결!");
		StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
		String sessionId = headerAccesor.getSessionId();
		LOGGER.info("Received a new web socket connection : " + sessionId);
	}

	// 사용자가 웹 소켓 연결을 끊으면 실행됨
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
		String sessionId = headerAccesor.getSessionId();

		LOGGER.info("sessionId Disconnected : " + sessionId);
	}

	/**
	 * 연결 확인용
	 * @param message
	 * @return
	 */
	@MessageMapping("/channel")
	public String sendMessage(String message) {
		log.info("Received message: {}", message);
		simpleMessageSendingOperations.convertAndSend("/sub", "socket connection completed.");
		return message;
	}

	/**
	 * 결제 동의
	 * @param agreeReq
	 */
	@MessageMapping("/agree")
	public void respondToAgreement(AgreeReq agreeReq) {
		AgreeRes agreeRes = payAgreeService.respondToAgreement(agreeReq.getPayId(), agreeReq.getParticipantId());

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/sub/" + agreeReq.getPayId(), agreeRes);
		log.info("동의 성공");
	}

	/**
	 * 대신내주기 요청
	 * @param insteadReq
	 */
	@MessageMapping("/instead-req")
	public void requestPayInstead(
		@AuthenticationPrincipal SecurityUserDto securityUserDto, InsteadRequestReq insteadReq) {
		Long borrowerId = securityUserDto.getMemberId();
		InsteadRes insteadRes = payInsteadService.requestPayInstead(insteadReq.getPayId(), borrowerId);

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/sub/" + insteadRes.getPayId(), insteadRes);
	}

	/**
	 * 대신내주기 승낙
	 * @param insteadReq
	 */
	@MessageMapping("/instead-res")
	public void respondToPayInstead(
		@AuthenticationPrincipal SecurityUserDto securityUserDto, InsteadAgreeReq insteadReq) {
		Long lenderId = securityUserDto.getMemberId();
		InsteadRes insteadRes = payInsteadService.respondToPayInstead(
			insteadReq.getPayId(), insteadReq.getBorrowerId(), lenderId);

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/sub/" + insteadRes.getPayId(), insteadRes);

	}
}
