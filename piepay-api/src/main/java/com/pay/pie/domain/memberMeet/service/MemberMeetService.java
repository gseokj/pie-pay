package com.pay.pie.domain.memberMeet.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.meet.dto.response.MeetInfo;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.exception.MemberException;
import com.pay.pie.domain.member.exception.MemberExceptionCode;
import com.pay.pie.domain.memberMeet.dto.request.JoinMeetRequest;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.exception.MemberMeetException;
import com.pay.pie.domain.memberMeet.exception.MemberMeetExceptionCode;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class MemberMeetService {
	private final MemberMeetRepository memberMeetRepository;
	private final MemberRepository memberRepository;
	private final MeetRepository meetRepository;

	// 모임 가입
	@Transactional
	public MeetInfo joinMeet(JoinMeetRequest request, Long memberId) {

		Member findMember = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(MemberExceptionCode.NOT_FOUND_MEMBER));

		Meet findMeet = meetRepository.findByMeetInvitation(request.meetInvitation())
			.orElseThrow(() -> new MemberMeetException(MemberMeetExceptionCode.NOT_FOUND_MEET));

		for (MemberMeet memberMeet : findMeet.getMemberMeetList()) {
			if (memberMeet.getMember().equals(findMember)) {
				throw new MemberMeetException(MemberMeetExceptionCode.REGISTERED_ALREADY);
			}
		}

		MemberMeet memberMeet = new MemberMeet(findMember, findMeet);
		memberMeetRepository.save(memberMeet);

		return MeetInfo.createMeetInfo(findMeet, findMember);
	}

	// public MemberMeet save(AddMemberMeetRequest request, Long memberId) {
	// 	Meet meet = meetRepository.findByMeetInvitation(request.getMeetInvitation())
	// 		.orElseThrow(() -> new IllegalArgumentException("해당 meetInvitation을 가진 Meet을 찾을 수 없음"));
	// 	Member member = memberRepository.findById(memberId)
	// 		.orElseThrow(() -> new IllegalArgumentException("해당 memberId를 가진 Member를 찾을 수 없음"));
	// 	// 수정 시작
	// 	// MemberMeet newMemberMeet = new MemberMeet();
	// 	// newMemberMeet.setMeet(meet);
	// 	// newMemberMeet.setMember(member);
	// 	MemberMeet newMemberMeet = MemberMeet.builder()
	// 		.member(member)
	// 		.meet(meet)
	// 		.build();
	//
	// 	List<MemberMeet> allMemberMeets = memberMeetRepository.findAll();
	//
	// 	MemberMeet existingMemberMeet = allMemberMeets.stream()
	// 		.filter(memberMeet ->
	// 			memberMeet.getMember().equals(newMemberMeet.getMember()) &&
	// 				memberMeet.getMeet().equals(newMemberMeet.getMeet()))
	// 		.findFirst()
	// 		.orElse(null);
	//
	// 	if (existingMemberMeet != null) {
	// 		return existingMemberMeet;
	// 	} else {
	// 		// request.setMeet(meet);
	// 		// request.setMember(member);
	// 		return memberMeetRepository.save(newMemberMeet);
	// 	}
	//
	// }

	public List<MemberMeet> findMemberByMeetId(long meetId) {
		return memberMeetRepository.findByMeetId(meetId);
	}

	public List<MemberMeet> findMeetByMemberId(long memberId) {
		return memberMeetRepository.findByMemberId(memberId);
	}

	public void deleteMemberMeet(long meetId, long memberId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new IllegalArgumentException("해당 memberId을 가진 Member을 찾을 수 없음"));
		MemberMeet memberMeet = memberMeetRepository.findByMeetAndMember(meet, member)
			.orElseThrow(() -> new IllegalArgumentException("유효한 MemberMeet을 찾을 수 없음"));

		memberMeetRepository.deleteById(memberMeet.getId());
	}

	public boolean favoriteMemberMeet(long memberId, long meetId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new IllegalArgumentException("해당 memberId을 가진 Member을 찾을 수 없음"));
		MemberMeet memberMeet = memberMeetRepository.findByMeetAndMember(meet, member)
			.orElseThrow(() -> new IllegalArgumentException("유효한 MemberMeet을 찾을 수 없음"));

		memberMeet.setTopFixed(!memberMeet.isTopFixed());

		//		return memberMeetRepository.save(memberMeet);
		return memberMeet.isTopFixed();
	}

	public List<MemberMeet> findAllByMeet(Meet meet) {
		return memberMeetRepository.findAllByMeet(meet);
	}

}
