package com.pay.pie.domain.memberMeet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.memberMeet.dto.AddMemberMeetRequest;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class MemberMeetService {
	private final MemberMeetRepository memberMeetRepository;
	private final MemberRepository memberRepository;
	private final MeetRepository meetRepository;

	@Autowired
	public MemberMeetService(MemberRepository memberRepository, MemberMeetRepository memberMeetRepository,
		MeetRepository meetRepository) {
		this.memberRepository = memberRepository;
		this.memberMeetRepository = memberMeetRepository;
		this.meetRepository = meetRepository;
	}

	// Autowired 필요함
	// @Autowired
	// private MeetRepository meetRepository;

	public MemberMeet save(AddMemberMeetRequest request) {
		Meet meet = meetRepository.findByMeetInvitation(request.getMeetInvitation())
			.orElseThrow(() -> new IllegalArgumentException("해당 meetInvitation을 가진 Meet을 찾을 수 없음"));

		request.setMeet(meet);
		return memberMeetRepository.save(request.toEntity());
	}

	public List<MemberMeet> findMemberByMeetId(long meetId) {
		return memberMeetRepository.findByMeetId(meetId);
	}

	public List<MemberMeet> findMeetByMemberId(long memberId) {
		return memberMeetRepository.findByMemberId(memberId);
	}
}
