package com.pay.pie.domain.application.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.application.dto.response.MemberAccountResponse;
import com.pay.pie.domain.application.service.MemberAndAccountService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberAndAccountController {

	private final MemberAndAccountService memberAndAccountService;

	@GetMapping("/member/accounts")
	public ResponseEntity<BaseResponse<List<MemberAccountResponse>>> findAccountByMember(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			memberAndAccountService.getAccountsInfo(securityUserDto.getMemberId())
		);
	}
}
