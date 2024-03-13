package com.pay.pie.domain.meet.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.service.MeetService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class MeetApiController {

	private final MeetService meetService;

	// HTTP 메서드가 POST일 때 전달받은 URL과 동일하면 매서드로 매핑
	@PostMapping("/meet")
	// 요청 본문 값 매핑
	public ResponseEntity<Meet> addMeet(@RequestBody AddMeetRequest request) {
		Meet savedMeet = meetService.save(request);

		// 요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답에 담아 전송
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(savedMeet);
	}
}
