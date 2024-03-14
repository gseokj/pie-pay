package com.pay.pie.domain.memberMeet.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
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
}
