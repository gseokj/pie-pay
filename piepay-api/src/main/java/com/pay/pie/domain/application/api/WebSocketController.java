package com.pay.pie.domain.application.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.pay.pie.domain.participant.application.AgreeParticipantService;
import com.pay.pie.domain.participant.application.ParticipantService;
import com.pay.pie.domain.payInstead.application.PayInsteadService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping
@RequiredArgsConstructor
public class WebSocketController {

	private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketController.class);

	private final SimpMessageSendingOperations simpleMessageSendingOperations;
	private final ParticipantService participantService;
	private final AgreeParticipantService agreeParticipantService;
	private final PayInsteadService payInsteadService;

	// 새로운 사용자가 웹 소켓을 연결할 때 실행됨
	// @EventListener은 한개의 매개변수만 가질 수 있다.
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
		LOGGER.info("Received a new web socket connection");
	}

	// 사용자가 웹 소켓 연결을 끊으면 실행됨
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
		String sessionId = headerAccesor.getSessionId();

		LOGGER.info("sessionId Disconnected : " + sessionId);
	}

	// /pub/cache 로 메시지를 발행한다.
	// @MessageMapping("/pay-start")
	// // @SendTo("/sub/agree")
	// public void sendMessage(Map<String, Object> params) {
	//
	// 	// /sub/cache 에 구독중인 client에 메세지를 보낸다.
	// 	simpleMessageSendingOperations.convertAndSend("/topic/agree/" + params.get("payId"), params);
	// }

	/*
	연결확인용
	 */
	@MessageMapping("/channel")
	@SendTo("/sub/{payId}")
	public String sendMessage(String message) {
		simpleMessageSendingOperations.convertAndSend("/sub", "socket connection completed.");
		return message;
	}

	// @MessageMapping("/{payId}/agree/{participantId}")
	// @SendTo("/sub/{payId}")
	// public void requestAgreement(
	// 	@DestinationVariable Long payId,
	// 	@DestinationVariable Long participantId) {
	// 	log.info("여기옴?");
	// 	agreeParticipantService.requestAgreement(payId, participantId);
	// }

	/*
	결제 동의
	 */
	@MessageMapping("/{payId}/agree/{participantId}")
	@SendTo("/sub/{payId}")
	public void respondToAgreement(
		@DestinationVariable Long payId,
		@DestinationVariable Long participantId,
		boolean agreed) {
		agreeParticipantService.respondToAgreement(payId, participantId);
	}

	/*
	대신내주기 요청
	 */
	@MessageMapping("/{payId}/instead/{borrowId}")
	@SendTo("/sub/{payId}")
	public void requestPayInstead(
		@DestinationVariable Long payId,
		@DestinationVariable Long borrowId) {
		payInsteadService.requestPayInstead(payId, borrowId);
	}

	/*
	대신내주기 승낙
	 */
	@MessageMapping("/{payId}/instead/{borrowId}/{lendId}")
	@SendTo("/sub/{payId}")
	public void respondToPayInstead(
		@DestinationVariable Long payId,
		@DestinationVariable Long borrowId,
		@DestinationVariable Long lendId,
		boolean agreed) {
		payInsteadService.respondToPayInstead(payId, borrowId, lendId, agreed);
	}

	// private PayParticipantService payParticipantService;
	// private final SimpMessageSendingOperations simpMessageSendingOperations;
	//
	// @MessageMapping("/hello")
	// // @SendTo("/greetings")
	// public void sendMessage(String message) {
	// 	simpMessageSendingOperations.convertAndSend("/sub/greetings", message);
	// 	log.info("여기옴??");
	// 	// return "Hello, " + message + "!";
	// }

	// @MessageMapping("/hello")
	// @SendTo("/topic/greeting")
	// public ResponseEntity<?> messageHandler(AgreeReq agree) {
	// 	try {
	// 		boolean success = payParticipantService.processAgreement(agree.getPayId(), agree.getParticipantId(),
	// 			agree.isPayAgree());
	// 		AgreeRes agreeRes = AgreeRes.builder()
	// 			.payId(agree.getPayId())
	// 			.participantId(agree.getParticipantId())
	// 			.payAgree(success) // 동의 처리 결과
	// 			.createdAt(LocalDateTime.now())
	// 			.build();
	//
	// 		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, agreeRes);
	//
	// 	} catch (Exception e) {
	// 		// 예외가 발생할 경우 처리
	// 		log.error("Error processing agreement: {}", e.getMessage());
	// 		ErrorResponse errorResponse = ErrorResponse.of()
	// 			.code(ErrorCode.INTERNAL_SERVER_ERROR)
	// 			.message("Error processing agreement")
	// 			.build();
	// 		return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
	// 	}
	// }
}
