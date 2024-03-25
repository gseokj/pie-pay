package com.pay.pie.domain.memberMeet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberMeetApiController {

	private final MemberMeetService memberMeetService;

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PostMapping("/meet/join")
	public ResponseEntity<BaseResponse<MemberMeet>> addMemberMeet(@RequestBody AddMemberMeetRequest request,
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Long memberId = securityUserDto.getMemberId();
		MemberMeet savedMemberMeet = memberMeetService.save(request, memberId);

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			savedMemberMeet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@DeleteMapping("/meet/{meetId}")
	public ResponseEntity<BaseResponse<Void>> deleteMemberMeet(@PathVariable Long meetId,
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Long memberId = securityUserDto.getMemberId();
		memberMeetService.deleteMemberMeet(meetId, memberId);

		return BaseResponse.success(
			SuccessCode.DELETE_SUCCESS,
			null);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PatchMapping("/meet/{meetId}/favorite")
	public ResponseEntity<BaseResponse<MemberMeet>> favoriteMemberMeet(@PathVariable Long meetId,
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Long memberId = securityUserDto.getMemberId();
		MemberMeet memberMeet = memberMeetService.favoriteMemberMeet(memberId, meetId);

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			memberMeet
		);
	}
}
