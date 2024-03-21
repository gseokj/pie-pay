// package com.pay.pie.domain.application.api;
//
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
//
// import com.pay.pie.domain.participant.application.AgreeParticipantService;
// import com.pay.pie.domain.payInstead.application.PayInsteadService;
//
// import lombok.RequiredArgsConstructor;
//
// @RestController
// @RequiredArgsConstructor
// @RequestMapping("/pay-participants")
// public class PayParticipantController {
//
// 	private final AgreeParticipantService agreeParticipantService;
// 	private final PayInsteadService payInsteadService;
//
// 	@PostMapping("/{participantId}/agreement")
// 	public ResponseEntity<String> requestAgreement(@PathVariable Long participantId) {
// 		agreeParticipantService.requestAgreement(participantId);
// 		return ResponseEntity.ok("Agreement request sent.");
// 	}
//
// 	@PostMapping("/{participantId}/agreement/response")
// 	public ResponseEntity<String> respondToAgreement(@PathVariable Long participantId,
// 		@RequestParam boolean agreed) {
// 		agreeParticipantService.respondToAgreement(participantId, agreed);
// 		return ResponseEntity.ok("Agreement response sent.");
// 	}
//
// 	@PostMapping("/{participantId}/payinstead")
// 	public ResponseEntity<String> requestPayInstead(@PathVariable Long participantId,
// 		@RequestParam Long payInsteadId) {
// 		payInsteadService.requestPayInstead(participantId, payInsteadId);
// 		return ResponseEntity.ok("Pay instead request sent.");
// 	}
//
// 	@PostMapping("/{participantId}/payinstead/response")
// 	public ResponseEntity<String> respondToPayInstead(@PathVariable Long participantId, @PathVariable Long payInsteadId,
// 		@RequestParam Long acceptedParticipantId,
// 		@RequestParam boolean agreed) {
// 		payInsteadService.respondToPayInstead(participantId, acceptedParticipantId, agreed);
// 		return ResponseEntity.ok("Pay instead response sent.");
// 	}
//
// }
