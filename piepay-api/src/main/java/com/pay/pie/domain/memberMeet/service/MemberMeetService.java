package com.pay.pie.domain.memberMeet.service;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class MemberMeetService {

	private final MemberMeetRepository memberMeetRepository;

	public MemberMeet save(AddMemberMeetRequest request) {
		return memberMeetRepository.save(request.toEntity());
	}
}
