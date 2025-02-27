package com.pay.pie.domain.memberMeet.api;

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

import com.pay.pie.domain.meet.dto.response.MeetInfo;
import com.pay.pie.domain.memberMeet.dto.request.JoinMeetRequest;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberMeetController {

	private final MemberMeetService memberMeetService;

	// 모임 가입
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@PostMapping("/meet/join")
	public ResponseEntity<BaseResponse<MeetInfo>> addMemberMeet(
		@RequestBody JoinMeetRequest request,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {

		return BaseResponse.success(
			SuccessCode.INSERT_SUCCESS,
			memberMeetService.joinMeet(request, securityUserDto.getMemberId()
			)
		);
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
	public ResponseEntity<BaseResponse<String>> favoriteMemberMeet(@PathVariable Long meetId,
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Long memberId = securityUserDto.getMemberId();
		boolean favorite = memberMeetService.favoriteMemberMeet(memberId, meetId);
		String returnData;
		if (favorite) {
			returnData = "즐겨찾기에 추가되었습니다.";
		} else {
			returnData = "즐겨찾기에서 해제되었습니다.";
		}
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			returnData
		);
	}
}
