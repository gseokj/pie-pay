package com.pay.pie.domain.meet.controller;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.dto.MeetResponse;
import com.pay.pie.domain.meet.dto.PayResponse;
import com.pay.pie.domain.meet.dto.UpdateInvitationRequest;
import com.pay.pie.domain.meet.dto.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.meet.service.MeetService;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.domain.pay.application.PayServiceImpl;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class MeetApiController {

	private final MeetService meetService;
	private final MemberMeetService memberMeetService;
	private final MeetRepository meetRepository;
	private final PayServiceImpl payService;

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	// HTTP 메서드가 POST일 때 전달받은 URL과 동일하면 매서드로 매핑
	@PostMapping("/meet")
	// 요청 본문 값 매핑
	public ResponseEntity<BaseResponse<Meet>> addMeet(@RequestBody AddMeetRequest request) {
		Meet savedMeet = meetService.save(request);

		// 요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답에 담아 전송
		return BaseResponse.success(
			SuccessCode.INSERT_SUCCESS,
			savedMeet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PatchMapping("meet/{id}/invitation")
	public ResponseEntity<BaseResponse<Meet>> updateInvitation(@PathVariable long id,
		UpdateInvitationRequest request) {
		Meet updatedMeet = meetService.updateMeetInvitation(id, request);

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			updatedMeet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PutMapping("meet/{id}/image")
	public ResponseEntity<BaseResponse<Meet>> updateMeetImage(@PathVariable long id,
		@RequestBody UpdateMeetImageRequest request) {
		Meet updatedMeet = meetService.updateMeetImage(id, request);

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			updatedMeet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PutMapping("meet/{id}/name")
	public ResponseEntity<BaseResponse<Meet>> updateMeetName(@PathVariable long id,
		@RequestBody UpdateMeetNameRequest request) {
		Meet updatedMeet = meetService.updateMeetName(id, request);

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			updatedMeet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("member/meets")
	public ResponseEntity<BaseResponse<List<MeetResponse>>> getAllMeet(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Long memberId = securityUserDto.getMemberId();
		List<MeetResponse> meetResponses = memberMeetService.findMeetByMemberId(memberId)
			.stream()
			.map(memberMeet -> {
				Meet meet = meetRepository.findById(memberMeet.getMeet().getId()).orElse(null);
				if (meet != null) {
					return new MeetResponse(meet);
				} else {
					// Member가 없는 경우에 대한 처리
					return null;
				}
			})
			.filter(Objects::nonNull) // null이 아닌 것들만 필터링
			.collect(Collectors.toList());

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meetResponses);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("meet/{meetId}/payment")
	public ResponseEntity<BaseResponse<List<PayResponse>>> getPayByMeetId(@PathVariable long meetId) {
		List<PayResponse> payResponses = payService.findPayByMeetId(meetId)
			.stream()
			.map(PayResponse::new)
			.toList();

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			payResponses);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("meet/{meetId}/paystatus")
	public ResponseEntity<BaseResponse<Meet>> getPayStatus(@PathVariable long meetId) {
		Pay pay = payService.findRecentPayByMeetId(meetId);
		Meet meet;
		if (pay.getPayStatus() == Pay.PayStatus.ING) {
			meet = pay.getMeet();
		} else {
			meet = null;
		}

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("meet/{meetId}")
	public ResponseEntity<BaseResponse<Meet>> getMeet(@PathVariable long meetId) {
		Meet meet = meetService.getMeet(meetId);

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("meet/{meetId}/payment/latest")
	public ResponseEntity<BaseResponse<Pay>> getLatestPayment(@PathVariable long meetId) {
		Meet meet = meetService.getMeet(meetId);
		List<Pay> pays = payService.findPayByMeetId(meetId);
		Pay latestPay = null;
		for (Pay pay : pays) {
			if (pay.getPayStatus() == Pay.PayStatus.COMPLETE) {
				latestPay = pay;
				break;
			}
		}
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			latestPay);
	}
}
