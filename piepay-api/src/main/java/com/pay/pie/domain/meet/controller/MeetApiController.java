package com.pay.pie.domain.meet.controller;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.dto.MeetResponse;
import com.pay.pie.domain.meet.dto.UpdateInvitationRequest;
import com.pay.pie.domain.meet.dto.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.meet.service.MeetService;
import com.pay.pie.domain.member.service.MemberService;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class MeetApiController {

	private final MeetService meetService;
	private final MemberService memberService;
	private final MemberMeetService memberMeetService;
	private final MeetRepository meetRepository;

	// HTTP 메서드가 POST일 때 전달받은 URL과 동일하면 매서드로 매핑
	@PostMapping("/meet")
	// 요청 본문 값 매핑
	public ResponseEntity<Meet> addMeet(@RequestBody AddMeetRequest request) {
		Meet savedMeet = meetService.save(request);

		// 요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답에 담아 전송
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(savedMeet);
	}

	@PatchMapping("meet/{id}/invitation")
	public ResponseEntity<Meet> updateInvitation(@PathVariable long id, UpdateInvitationRequest request) {
		Meet updatedMeet = meetService.updateMeetInvitation(id, request);

		return ResponseEntity.status(HttpStatus.OK)
			.body(updatedMeet);
	}

	@PutMapping("meet/{id}/image")
	public ResponseEntity<Meet> updateMeetImage(@PathVariable long id, @RequestBody UpdateMeetImageRequest request) {
		Meet updatedMeet = meetService.updateMeetImage(id, request);

		return ResponseEntity.status(HttpStatus.OK)
			.body(updatedMeet);
	}

	@PutMapping("meet/{id}/name")
	public ResponseEntity<Meet> updateMeetName(@PathVariable long id, @RequestBody UpdateMeetNameRequest request) {
		Meet updatedMeet = meetService.updateMeetName(id, request);

		return ResponseEntity.status(HttpStatus.OK)
			.body(updatedMeet);
	}

	@GetMapping("member/{memberId}/meet")
	public ResponseEntity<List<MeetResponse>> getAllMeet(@PathVariable long memberId) {
		List<MeetResponse> meetResponses = memberMeetService.findMeetByMemberId(memberId)
			.stream()
			.map(memberMeet -> {
				Meet meet = meetRepository.findById(memberMeet.getMeetId()).orElse(null);
				if (meet != null) {
					return new MeetResponse(meet);
				} else {
					// Member가 없는 경우에 대한 처리
					return null;
				}
			})
			.filter(Objects::nonNull) // null이 아닌 것들만 필터링
			.collect(Collectors.toList());

		return ResponseEntity.ok()
			.body(meetResponses);
	}
}
