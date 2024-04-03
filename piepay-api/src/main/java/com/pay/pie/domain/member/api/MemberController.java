package com.pay.pie.domain.member.api;

import java.util.List;

import com.pay.pie.domain.payInstead.dto.MyPayInsteadDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pay.pie.domain.member.application.MemberServiceImpl;
import com.pay.pie.domain.member.dto.UpdateMemberRequest;
import com.pay.pie.domain.member.dto.response.MemberDetailResponse;
import com.pay.pie.domain.participant.application.ParticipantServiceImpl;
import com.pay.pie.domain.participant.dto.reponse.MyParticipantResponse;
import com.pay.pie.domain.payInstead.application.PayInsteadServiceImpl;
import com.pay.pie.domain.payInstead.dto.MyPayInsteadResponse;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class MemberController {

	private final MemberServiceImpl memberService;
	private final ParticipantServiceImpl participantService;
	private final PayInsteadServiceImpl payInsteadService;

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/member")
	public ResponseEntity<BaseResponse<MemberDetailResponse>> getMemberDetail(
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			memberService.getMemberDetail(securityUserDto.getMemberId())
		);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PutMapping("/member")
	public ResponseEntity<BaseResponse<MemberDetailResponse>> updateMember(
		@AuthenticationPrincipal SecurityUserDto securityUserDto,
		@RequestBody UpdateMemberRequest request
	) {

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			memberService.updateMemberDetail(securityUserDto.getMemberId(), request)
		);
	}

	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@PatchMapping("/member/profileImage")
	public ResponseEntity<BaseResponse<MemberDetailResponse>> changeMemberProfileImage(
		@AuthenticationPrincipal SecurityUserDto securityUserDto,
		@RequestPart(value = "image", required = false) MultipartFile image
	) {
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			memberService.updateMemberProfileImage(image, securityUserDto.getMemberId())
		);
	}

	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@GetMapping("/member/payments")
	public ResponseEntity<BaseResponse<List<MyParticipantResponse>>> myParticipant(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			participantService.myParticipant(securityUserDto.getMemberId())
		);
	}

	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@GetMapping("/member/debts")
	public ResponseEntity<BaseResponse<List<MyPayInsteadDto>>> myPayInstead(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			payInsteadService.myPayInstead2(securityUserDto.getMemberId())
		);
	}
}

