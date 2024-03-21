package com.pay.pie.domain.member.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.member.application.MemberCertificationService;
import com.pay.pie.domain.member.dto.request.PhoneVerificationRequest;
import com.pay.pie.domain.member.dto.request.PhoneVerificationCheckRequest;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members/verify")
@RequiredArgsConstructor
public class MemberCertificationController {

	private final MemberCertificationService memberCertificationService;

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/phone-number")
	public void sendCertificationNumber(
		@RequestBody PhoneVerificationRequest phoneVerificationRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		memberCertificationService.sendCertificationNumber(phoneVerificationRequest);
	}

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/phone-number/confirm")
	public ResponseEntity<BaseResponse<String>> confirmPhoneCertificationNumber(
		@RequestBody PhoneVerificationCheckRequest phoneVerificationCheckRequest
	) {

		memberCertificationService.checkCertificationNumber(phoneVerificationCheckRequest);
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, "본인 인증이 완료되었습니다");
	}

}
