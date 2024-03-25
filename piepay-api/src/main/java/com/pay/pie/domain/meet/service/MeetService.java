package com.pay.pie.domain.meet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.dto.UpdateInvitationRequest;
import com.pay.pie.domain.meet.dto.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final이 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class MeetService {
	private final MeetRepository meetRepository;

	// Autowired 필요함
	@Autowired
	private MemberMeetRepository memberMeetRepository;

	// 모임 추가 매서드
	public Meet save(AddMeetRequest request) {
		return meetRepository.save(request.toEntity());
	}

	@Transactional
	public Meet updateMeetInvitation(long id, UpdateInvitationRequest request) {
		Meet meet = meetRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("not found: " + id));

		meet.updateInvitation();

		return meet;
	}

	@Transactional
	public Meet updateMeetImage(long id, UpdateMeetImageRequest request) {
		Meet meet = meetRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("not found: " + id));
		meet.updateMeetImage(request.getMeetImage());

		return meet;
	}

	@Transactional
	public Meet updateMeetName(long id, UpdateMeetNameRequest request) {
		Meet meet = meetRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("not found: " + id));
		meet.updateMeetName(request.getMeetName());

		return meet;
	}

	public Meet getMeet(long meetId) {
		// Meet meet = meetRepository.findById(meetId)
		// 	.orElseThrow(() -> new IllegalArgumentException("not found: " + meetId));

		return meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("not found: " + meetId));
	}
}
