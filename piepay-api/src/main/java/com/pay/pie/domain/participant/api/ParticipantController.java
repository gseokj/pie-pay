package com.pay.pie.domain.participant.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.participant.application.ParticipantService;
import com.pay.pie.domain.participant.dto.reponse.SelectedPartiesRes;
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
	 * @param openerId 결제하는 사람 ID
	 * @param participants 참여자들 정보
	 * @return 성공 메시지
	 */
	@PostMapping()
	public ResponseEntity<BaseResponse<SelectedPartiesRes>> selectParticipant(
		@RequestParam Long openerId,
		@RequestBody List<ParticipantReq> participants) {
		System.out.println("participants = " + participants);
		SelectedPartiesRes selectedPartiesRes = participantService.selectParticipant(openerId, participants);

		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, selectedPartiesRes);
	}
}
