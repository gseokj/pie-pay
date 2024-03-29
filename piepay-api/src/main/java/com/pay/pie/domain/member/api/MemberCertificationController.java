package com.pay.pie.domain.member.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.member.application.MemberCertificationService;
import com.pay.pie.domain.member.dto.verify.request.AccountVerificationCheckRequest;
import com.pay.pie.domain.member.dto.verify.request.AccountVerificationRequest;
import com.pay.pie.domain.member.dto.verify.request.PaymentPasswordRequest;
import com.pay.pie.domain.member.dto.verify.request.PhoneVerificationCheckRequest;
import com.pay.pie.domain.member.dto.verify.request.PhoneVerificationRequest;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;
import com.pay.pie.global.security.dto.TokenDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members/verify")
@RequiredArgsConstructor
public class MemberCertificationController {

	private final MemberCertificationService memberCertificationService;

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/phone-number")
	public ResponseEntity<BaseResponse<String>> sendCertificationNumber(
		@RequestBody PhoneVerificationRequest phoneVerificationRequest
	) {
		memberCertificationService.sendCertificationNumber(phoneVerificationRequest);
		return BaseResponse.success(SuccessCode.VERIFICATION_REQUEST_SUCCESS, "본인 인증이 완료되었습니다");
	}

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/phone-number/confirm")
	public ResponseEntity<BaseResponse<String>> confirmPhoneCertificationNumber(
		@RequestBody PhoneVerificationCheckRequest phoneVerificationCheckRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		memberCertificationService.checkCertificationNumber(phoneVerificationCheckRequest, securityUserDto);
		return BaseResponse.success(SuccessCode.VERIFICATION_SUCCESS, "본인 인증이 완료되었습니다");
	}

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/account")
	public ResponseEntity<BaseResponse<String>> sendAccountCertificationNumber(
		@RequestBody AccountVerificationRequest accountVerificationRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		memberCertificationService.sendAccountCertificationNumber(accountVerificationRequest, securityUserDto);
		return BaseResponse.success(SuccessCode.VERIFICATION_REQUEST_SUCCESS, "입금자명 확인!");
	}

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/account/confirm")
	public ResponseEntity<BaseResponse<String>> confirmAccountCertificationNumber(
		@RequestBody AccountVerificationCheckRequest accountVerificationCheckRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		memberCertificationService.checkCertificationWord(accountVerificationCheckRequest, securityUserDto);
		return BaseResponse.success(SuccessCode.VERIFICATION_SUCCESS, "통장 인증 완료");
	}

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/payment/password")
	public ResponseEntity<BaseResponse<String>> setPaymentPassword(
		@RequestBody PaymentPasswordRequest paymentPasswordRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		memberCertificationService.setPaymentPassword(paymentPasswordRequest, securityUserDto);
		return BaseResponse.success(SuccessCode.VERIFICATION_REQUEST_SUCCESS, "Pay Password 입력 완료");
	}

	@PreAuthorize("hasAnyRole('ROLE_NOT_CERTIFIED')")
	@PostMapping("/payment/password/confirm")
	public ResponseEntity<BaseResponse<TokenDto>> reEnterPaymentPassword(
		@RequestBody PaymentPasswordRequest paymentPasswordRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {

		return BaseResponse.success(
			SuccessCode.VERIFICATION_SUCCESS,
			memberCertificationService.reEnterPaymentPassword(paymentPasswordRequest, securityUserDto)
		);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PutMapping("/payment/password")
	public ResponseEntity<BaseResponse<String>> setPaymentPassword2(
		@RequestBody PaymentPasswordRequest paymentPasswordRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		memberCertificationService.setPaymentPassword(paymentPasswordRequest, securityUserDto);
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, "Pay Password 입력 완료");
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PutMapping("/payment/password/confirm")
	public ResponseEntity<BaseResponse<TokenDto>> reEnterPaymentPassword2(
		@RequestBody PaymentPasswordRequest paymentPasswordRequest,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {

		return BaseResponse.success(
			SuccessCode.CHECK_SUCCESS,
			memberCertificationService.reEnterPaymentPassword(paymentPasswordRequest, securityUserDto)
		);
	}

}
