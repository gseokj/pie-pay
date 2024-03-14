package com.pay.pie.domain.memberMeet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class MemberMeetService {

	private final MemberMeetRepository memberMeetRepository;

	@Autowired
	private MeetRepository meetRepository;

	public MemberMeet save(AddMemberMeetRequest request) {
		Meet meet = meetRepository.findByMeetInvitation(request.getMeetInvitation())
			.orElseThrow(() -> new IllegalArgumentException("해당 meetInvitation을 가진 Meet을 찾을 수 없음"));

		request.setMeetId(meet.getId());
		return memberMeetRepository.save(request.toEntity());
	}
}
