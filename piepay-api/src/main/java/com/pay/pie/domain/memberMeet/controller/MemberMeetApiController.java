package com.pay.pie.domain.memberMeet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberMeetApiController {

	private final MemberMeetService memberMeetService;

	@PostMapping("/meet/join")
	public ResponseEntity<BaseResponse<MemberMeet>> addMemberMeet(@RequestBody AddMemberMeetRequest request) {
		MemberMeet savedMemberMeet = memberMeetService.save(request);
		// return ResponseEntity.status(HttpStatus.CREATED)
		// 	.body(savedMemberMeet);

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			savedMemberMeet);
	}

	@DeleteMapping("/meet/{meetId}/member/{memberId}")
	public ResponseEntity<BaseResponse<Void>> deleteMemberMeet(@PathVariable Long meetId,
		@PathVariable Long memberId) {
		memberMeetService.deleteMemberMeet(meetId, memberId);

		return BaseResponse.success(
			SuccessCode.DELETE_SUCCESS,
			null);
	}
}
