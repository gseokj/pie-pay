package com.pay.pie.domain.application.api;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.pay.pie.domain.pay.application.PayParticipantService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketController {

	private PayParticipantService payParticipantService;

	@MessageMapping("/hello")
	@SendTo("/greetings")
	public String sendMessage(String message) {
		return "Hello, " + message + "!";

	}

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
