package com.pay.pie.domain.meet.api;

import java.util.Comparator;
import java.util.List;
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

import com.pay.pie.domain.meet.dto.MeetDto;
import com.pay.pie.domain.meet.dto.MeetStatusResponse;
import com.pay.pie.domain.meet.dto.PayResponse;
import com.pay.pie.domain.meet.dto.request.CreateMeetRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.dto.response.MeetDetailResponse;
import com.pay.pie.domain.meet.dto.response.MeetHighlightResponse;
import com.pay.pie.domain.meet.dto.response.MeetInfo;
import com.pay.pie.domain.meet.dto.response.MeetMemberInfo;
import com.pay.pie.domain.meet.dto.response.UpdateInvitationResponse;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.meet.service.MeetService;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;
import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.order.dto.response.OrderOfPayResponse;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.application.PayServiceImpl;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.dto.LatestPayRes;
import com.pay.pie.domain.pay.dto.response.PayStatusIngResponse;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class MeetController {

	private final MeetService meetService;
	private final MemberMeetService memberMeetService;
	private final PayServiceImpl payService;
	private final MemberMeetRepository memberMeetRepository;
	private final OrderRepository orderRepository;
	private final PayRepository payRepository;
	private final MeetRepository meetRepository;

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
		@RequestPart(value = "request") UpdateMeetImageRequest request
	) {
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			meetService.changeMeetImage(image, request)
		);
	}

	// 모임 전체 조회
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@GetMapping("/meets")
	public ResponseEntity<BaseResponse<List<MeetInfo>>> getMeetList(
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meetService.getMeetList(securityUserDto.getMemberId())
		);

	}

	// 새로운 모임 생성
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@PostMapping("/meet")
	public ResponseEntity<BaseResponse<MeetInfo>> createMeet(
		@RequestBody CreateMeetRequest request,
		@AuthenticationPrincipal SecurityUserDto securityUserDto
	) {
		return BaseResponse.success(
			SuccessCode.INSERT_SUCCESS,
			meetService.createMeet(securityUserDto.getMemberId(), request)
		);
	}

	// 모임 초대코드 변경
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@PatchMapping("/meet/{id}/invitation")
	public ResponseEntity<BaseResponse<UpdateInvitationResponse>> updateInvitation(
		@PathVariable long id
	) {
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			meetService.updateMeetInvitation(id)
		);
	}

	// 모임 회원 정보 조회
	@PreAuthorize("hasRole('ROLE_CERTIFIED')")
	@GetMapping("/meet/{meetId}/members")
	public ResponseEntity<BaseResponse<List<MeetMemberInfo>>> getMeetMemberInfo(@PathVariable long meetId) {

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meetService.getMeetMemberInfo(meetId)
		);

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
		if (pay.getPayStatus() == Pay.PayStatus.OPEN) {
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
	public ResponseEntity<BaseResponse<LatestPayRes>> getLatestPayment(@PathVariable long meetId) {
		List<Pay> pays = payRepository.findAllByMeetId(meetId);
		Pay latestPay = null;
		for (Pay pay : pays) {
			log.info("pay:{}", pay);
			Order latestOrder = orderRepository.findTopByPayOrderByUpdatedAtDesc(pay);
			log.info("latestOrder: {}", latestOrder);
			if (latestOrder != null && latestOrder.getPaymentStatus()
				== Order.PaymentStatus.PAID) {
				log.info("PAID_order: {}", latestOrder.getPaymentStatus());
				latestPay = pay;
				log.info("latestPay: {}", latestPay);
				break;
			}
		}

		LatestPayRes latestPayRes = null;
		// Pay latestPay = payRepository.findById(latestPay.getId()).orElse(null);
		if (latestPay != null) {
			latestPayRes = LatestPayRes.builder()
				.createdAt(latestPay.getCreatedAt())
				.updateAt(latestPay.getUpdatedAt())
				.id(latestPay.getId())
				.meet(MeetDto.of(meetRepository.findById(meetId).orElseThrow(
					() -> new IllegalArgumentException("없는 meetId")
				)))
				.payStatus(latestPay.getPayStatus())
				.openerId(latestPay.getOpenerId())
				.totalPayAmount(latestPay.getTotalPayAmount())
				.build();
		}
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS, latestPayRes);
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
	public ResponseEntity<BaseResponse<MeetHighlightResponse>> getHighlight(@PathVariable Long meetId) {

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			meetService.getHighlight(meetId)
		);
	}
}
