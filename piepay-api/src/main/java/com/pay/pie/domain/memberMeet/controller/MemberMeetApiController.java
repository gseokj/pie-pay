package com.pay.pie.domain.memberMeet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.dto.MemberMeetResponse;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberMeetApiController {

	private final MemberMeetService memberMeetService;

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PostMapping("/meet/join")
	@Transactional
	public ResponseEntity<BaseResponse<MemberMeetResponse>> addMemberMeet(@RequestBody AddMemberMeetRequest request,
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Long memberId = securityUserDto.getMemberId();
		MemberMeet savedMemberMeet = memberMeetService.save(request, memberId);

		Meet meet = savedMemberMeet.getMeet();

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			new MemberMeetResponse(savedMemberMeet, memberMeetService.findAllByMeet(meet).size()));
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@DeleteMapping("/meet/{meetId}")
	@Transactional
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
	@Transactional
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
