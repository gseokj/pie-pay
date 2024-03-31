package com.pay.pie.domain.member.api;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.member.application.MemberServiceImpl;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.dto.MemberResponse;
import com.pay.pie.domain.member.dto.UpdateMemberRequest;
import com.pay.pie.domain.member.dto.response.AccountResponse;
import com.pay.pie.domain.member.dto.response.MemberDetailResponse;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class MemberController {

	private final MemberServiceImpl memberService;
	private final MemberMeetService memberMeetService;
	private final MemberRepository memberRepository;

	@GetMapping("/meet/{meetId}/member")
	public ResponseEntity<BaseResponse<List<MemberResponse>>> findMemberMeet(@PathVariable long meetId) {
		AtomicInteger idx = new AtomicInteger(0); // AtomicInteger를 사용하여 idx를 선언하고 초기화
		List<Object[]> membersPayInfo = memberService.findPayInfoByMeetId(meetId);
		List<MemberResponse> memberResponses = memberMeetService.findMemberByMeetId(meetId)
			.stream()
			.map(memberMeet -> {
				Member member;
				Long payCount;
				Long payTotal;
//				Member member = memberRepository.findById(memberMeet.getMember().getId()).orElse(null);
				if (!membersPayInfo.isEmpty()) {
					member = memberService.findMemberById((Long)membersPayInfo.get(idx.get())[0]);
					payCount = (Long)membersPayInfo.get(idx.get())[1];
					payTotal = (Long) membersPayInfo.get(idx.getAndIncrement())[2];
				} else {
					member = memberMeet.getMember();
					payCount = 0L;
					payTotal = 0L;
				}
				if (member != null) {
					return new MemberResponse(member, payCount,
							payTotal);
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
	public ResponseEntity<BaseResponse<MemberDetailResponse>> updateMember (
		@AuthenticationPrincipal SecurityUserDto securityUserDto,
		@RequestBody UpdateMemberRequest request
	) {

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			memberService.updateMemberDetail(securityUserDto.getMemberId(), request )
		);
	}

}

