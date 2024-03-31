package com.pay.pie.domain.meet.api;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.dto.HighlightResponse;
import com.pay.pie.domain.meet.dto.MeetResponse;
import com.pay.pie.domain.meet.dto.MeetStatusResponse;
import com.pay.pie.domain.meet.dto.PayResponse;
import com.pay.pie.domain.meet.dto.UpdateInvitationRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.dto.response.MeetDetailResponse;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.service.MeetService;
import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.dto.AllMemberMeetResponse;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.order.dto.response.OrderOfPayResponse;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.application.PayServiceImpl;
import com.pay.pie.domain.pay.dto.response.PayStatusIngResponse;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class MeetController {

	private final MeetService meetService;
	private final MemberMeetService memberMeetService;
	private final PayServiceImpl payService;
	private final MemberMeetRepository memberMeetRepository;
	private final OrderRepository orderRepository;

	// 모임 상세 정보 조회
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@GetMapping("/meet/{meetId}")
	public ResponseEntity<BaseResponse<MeetDetailResponse>> getMeet(@PathVariable long meetId) {

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meetService.getMeetInfo(meetId)
		);
	}

	// 모임 이름 변경
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@PutMapping("/meet/name")
	public ResponseEntity<BaseResponse<MeetDetailResponse>> updateMeetName(@RequestBody UpdateMeetNameRequest request) {

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meetService.changeMeetName(request)
		);
	}

	// 모임 이미지 등록
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@PutMapping("/meet/image")
	public ResponseEntity<BaseResponse<MeetDetailResponse>> updateMeetImage(
		@RequestPart(value = "image", required = false) MultipartFile image,
		@RequestPart(value = "request")UpdateMeetImageRequest request
	) {
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			meetService.changeMeetImage(image, request)
		);
	}







	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PostMapping("/meet")
	// 요청 본문 값 매핑
	public ResponseEntity<BaseResponse<MeetResponse>> addMeet(@RequestBody AddMeetRequest request,
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Meet savedMeet = meetService.save(request);

		String invitation = savedMeet.getMeetInvitation();
		Long memberId = securityUserDto.getMemberId();
		AddMemberMeetRequest addMemberMeetRequest = new AddMemberMeetRequest();
		addMemberMeetRequest.setMeetInvitation(invitation);
		memberMeetService.save(addMemberMeetRequest, memberId);

		// 요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답에 담아 전송
		return BaseResponse.success(
			SuccessCode.INSERT_SUCCESS,
			new MeetResponse(savedMeet, memberMeetService.findAllByMeet(savedMeet).size()));
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PatchMapping("/meet/{id}/invitation")
	public ResponseEntity<BaseResponse<Meet>> updateInvitation(@PathVariable long id,
		UpdateInvitationRequest request) {
		Meet updatedMeet = meetService.updateMeetInvitation(id, request);

		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			updatedMeet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/member/meets")
	public ResponseEntity<BaseResponse<List<AllMemberMeetResponse>>> getAllMeet(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		Long memberId = securityUserDto.getMemberId();
		List<AllMemberMeetResponse> meetResponses = memberMeetService.findMeetByMemberId(memberId)
			.stream()
			.map(memberMeet -> {
				Meet meet = meetService.findById(memberMeet.getMeet().getId()).orElse(null);
				if (meet != null) {
					LocalDateTime latestUpdateOnMeet;
					if (payService.findRecentPayByMeetId(meet.getId()) != null) {
						latestUpdateOnMeet = payService.findRecentPayByMeetId(meet.getId()).getUpdatedAt();
					} else {
						latestUpdateOnMeet = meet.getUpdatedAt();
					}
					return new AllMemberMeetResponse(memberMeet, memberMeetService.findAllByMeet(meet).size(),
						latestUpdateOnMeet);
				} else {
					// Member가 없는 경우에 대한 처리
					return null;
				}
			})
			.filter(Objects::nonNull) // null이 아닌 것들만 필터링
			.collect(Collectors.toList());

		Collections.sort(meetResponses, Comparator
			.comparing(AllMemberMeetResponse::isTopFixed, Comparator.reverseOrder())
			.thenComparing(AllMemberMeetResponse::getUpdated_at, Comparator.reverseOrder())
		);

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meetResponses);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/meet/{meetId}/payment")
	public ResponseEntity<BaseResponse<List<PayResponse>>> getPayByMeetId(@PathVariable long meetId) {
		List<PayResponse> payResponses = payService.findPayByMeetId(meetId)
			.stream()
			.map(pay -> {
				Order order = orderRepository.findByPayId(pay.getId());
				return new PayResponse(pay, order != null ? new OrderOfPayResponse(order) : null);
			})
			.filter(payResponse -> payResponse.getOrders() != null)
			.sorted(Comparator.comparing(PayResponse::getUpdatedAt).reversed()) // updated_at을 기준으로 내림차순으로 정렬
			.toList();

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			payResponses);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/meet/{meetId}/paystatus")
	public ResponseEntity<BaseResponse<MeetStatusResponse>> getPayStatus2(@PathVariable long meetId) {
		Pay pay = payService.findRecentPayByMeetId(meetId);
		MeetStatusResponse meet;
		if (pay.getPayStatus() == Pay.PayStatus.ING) {
			meet = new MeetStatusResponse(pay.getMeet());
		} else {
			meet = null;
		}

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meet);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/meet/{meetId}/payment/latest")
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

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/meet/paystatus")
	public ResponseEntity<BaseResponse<List<Optional<PayStatusIngResponse>>>> getPayStatus(
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		List<MemberMeet> memberMeets = memberMeetRepository.findByMemberId(securityUserDto.getMemberId());
		List<Optional<PayStatusIngResponse>> payResponses = memberMeets
			.stream()
			// .map(PayResponse::new)
			.map(memberMeet -> {
				Long meetId = memberMeet.getMeet().getId();
				Pay pay = payService.findRecentPayByMeetId(meetId);
				if (pay != null && pay.getPayStatus() == Pay.PayStatus.ING) {
					return Optional.of(new PayStatusIngResponse(pay));
				} else {
					return Optional.<PayStatusIngResponse>empty();
				}
			})
			// .sorted(Comparator.comparing(PayResponse::getUpdatedAt).reversed()) // updated_at을 기준으로 내림차순으로 정렬
			.filter(Optional::isPresent)
			.collect(Collectors.toList());

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			payResponses);
	}

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@GetMapping("/meet/{meetId}/highlight")
	public ResponseEntity<BaseResponse<HighlightResponse>> getHighlight(@PathVariable long meetId,
		@AuthenticationPrincipal SecurityUserDto securityUserDto) {
		HighlightResponse highlightResponse = meetService.getHighlight(meetId);

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			highlightResponse);
	}
}
