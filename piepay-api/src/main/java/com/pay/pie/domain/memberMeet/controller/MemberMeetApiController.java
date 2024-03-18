package com.pay.pie.domain.memberMeet.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.dto.MemberMeetResponse;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.service.MemberMeetService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberMeetApiController {

	private final MemberMeetService memberMeetService;

	@PostMapping("/meet/join")
	public ResponseEntity<MemberMeet> addMemberMeet(@RequestBody AddMemberMeetRequest request) {
		MemberMeet savedMemberMeet = memberMeetService.save(request);
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(savedMemberMeet);
	}

	@GetMapping("/meet/{meetId}/member")
	public ResponseEntity<List<MemberMeetResponse>> findMemberMeet(@PathVariable long meetId) {
		List<MemberMeetResponse> memberMeets = memberMeetService.findMemberByMeetId(meetId)
			.stream()
			.map(MemberMeetResponse::new)
			.toList();

		return ResponseEntity.ok()
			.body(memberMeets);
	}
}
