package com.pay.pie.domain.participant.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.participant.application.ParticipantService;
import com.pay.pie.domain.participant.dto.request.ParticipantReq;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/pay/parties")
@RequiredArgsConstructor
public class ParticipantController {

	private final ParticipantService participantService;

	/**
	 * 결제 참여자 설정
	 * @param payId 결제 ID
	 * @param participants 참여자들 정보
	 * @return 성공 메시지
	 */
	@PostMapping("/{payId}")
	public ResponseEntity<BaseResponse<String>> selectParticipant(
		@PathVariable Long payId,
		@RequestBody List<ParticipantReq> participants) {

		participantService.selectParticipant(payId, participants);
		log.info("결제id: {}", payId);
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, "결제 참여자 설정 완료");
	}
}
