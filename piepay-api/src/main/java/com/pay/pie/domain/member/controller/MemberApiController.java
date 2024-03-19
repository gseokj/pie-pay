package com.pay.pie.domain.member.controller;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.dto.MemberResponse;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.service.MemberService;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberApiController {

	private final MemberService memberService;
	private final MemberMeetService memberMeetService;
	private final MemberRepository memberRepository;

	@GetMapping("/meet/{meetId}/member")
	public ResponseEntity<BaseResponse<List<MemberResponse>>> findMemberMeet(@PathVariable long meetId) {
		List<MemberResponse> memberResponses = memberMeetService.findMemberByMeetId(meetId)
			.stream()
			.map(memberMeet -> {
				Member member = memberRepository.findById(memberMeet.getMember().getId()).orElse(null);
				if (member != null) {
					return new MemberResponse(member);
				} else {
					// Member가 없는 경우에 대한 처리
					return null;
				}
			})
			.filter(Objects::nonNull) // null이 아닌 것들만 필터링
			.collect(Collectors.toList());

		// return ResponseEntity.ok()
		// 	.body(memberResponses);

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			memberResponses);
	}
}
