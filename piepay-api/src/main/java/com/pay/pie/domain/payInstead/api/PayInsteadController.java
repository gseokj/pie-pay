package com.pay.pie.domain.payInstead.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.payInstead.application.PayInsteadService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/pay/payback")
@RequiredArgsConstructor
@AllArgsConstructor
public class PayInsteadController {

	private PayInsteadService payInsteadService;

	/**
	 * 대신내주기 이체 정산 요청
	 * @param payInsteadId 대신내주기 ID
	 * @return "이체 완료"
	 */
	@PostMapping("/{payInsteadId}")
	public ResponseEntity<BaseResponse<String>> paybackInsteadPayment(
		@AuthenticationPrincipal SecurityUserDto securityUserDto,
		@PathVariable Long payInsteadId) {
		//은행으로 이체정산
		payInsteadService.paybackInsteadPayment(payInsteadId, securityUserDto);
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, "이체정산 완료!");
	}
}
