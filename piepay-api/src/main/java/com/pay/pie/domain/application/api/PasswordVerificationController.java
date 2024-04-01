package com.pay.pie.domain.application.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.application.dto.request.VerifyPasswordReq;
import com.pay.pie.domain.application.service.PasswordVerificationService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pay-password")
public class PasswordVerificationController {

	private final PasswordVerificationService passwordVerificationService;

	@PostMapping("/verify")
	public ResponseEntity<BaseResponse<Boolean>> verifyPassword(
		@AuthenticationPrincipal SecurityUserDto securityUserDto,
		@RequestBody VerifyPasswordReq passwordReq) {

		// Long memberId = securityUserDto.getMemberId();
		boolean isPasswordCorrect = passwordVerificationService.verifyPassword(securityUserDto,
			passwordReq.getPayPassword());

		if (isPasswordCorrect) {
			// 비밀번호 맞음
			return BaseResponse.success(SuccessCode.CHECK_SUCCESS, true);
		} else {
			// 비밀번호 틀림
			return BaseResponse.success(SuccessCode.CHECK_SUCCESS, false);
		}
	}

}
