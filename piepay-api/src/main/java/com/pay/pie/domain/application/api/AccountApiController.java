package com.pay.pie.domain.application.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.account.service.AccountService;
import com.pay.pie.domain.application.dto.reponse.AccountResponse;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AccountApiController {

	private final AccountService accountService;
	private final MemberRepository memberRepository;

	@GetMapping("member/accounts")
	public ResponseEntity<BaseResponse<List<AccountResponse>>> findAccountByMember(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Member member = memberRepository.findById(securityUserDto.getMemberId()).orElseThrow();
		List<AccountResponse> accounts = accountService.findByMember(member)
			.stream()
			.map(AccountResponse::new)
			.toList();

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			accounts);
	}
}
