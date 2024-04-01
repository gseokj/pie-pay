package com.pay.pie.domain.meet.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.dto.HighlightResponse;
import com.pay.pie.domain.meet.dto.MeetResponse;
import com.pay.pie.domain.meet.dto.UpdateInvitationRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.dto.response.MeetDetailResponse;
import com.pay.pie.domain.meet.dto.response.MeetInfo;
import com.pay.pie.domain.meet.dto.response.MeetMember;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.exception.MemberException;
import com.pay.pie.domain.member.exception.MemberExceptionCode;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.global.util.S3Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetService {

	private final S3Util s3Util;
	private final MemberRepository memberRepository;
	private final MeetRepository meetRepository;
	private final PayRepository payRepository;

	///////
	public MeetDetailResponse getMeetInfo(long meetId) {

		Meet findMeet = meetRepository.findMeetInfo(meetId);

		return MeetDetailResponse.of(findMeet, findMeet.getMemberMeetList().size());
	}

	/////////
	@Transactional
	public MeetDetailResponse changeMeetName(UpdateMeetNameRequest request) {

		Meet findMeet = meetRepository.findMeetInfo(request.meetId());
		findMeet.updateMeetName(request.meetName());

		return MeetDetailResponse.of(findMeet, findMeet.getMemberMeetList().size());
	}

	@Transactional
	public MeetDetailResponse changeMeetImage(MultipartFile image, UpdateMeetImageRequest request) {

		Meet findMeet = meetRepository.findMeetInfo(request.meetId());

		String s3Url = s3Util.upload(image);
		findMeet.updateMeetImage(s3Url);

		return MeetDetailResponse.of(findMeet, findMeet.getMemberMeetList().size());
	}

	public List<MeetInfo> getMeetList(Long memberId) {

		Member findMember = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(MemberExceptionCode.NOT_FOUND_MEMBER));

		List<Long> meetListByMemberId = meetRepository.findMeetListByMemberId(5L);

		List<Meet> membersInMeetList = meetRepository.findMembersInMeetList(meetListByMemberId);

		List<Pay> latestPayInfoList = payRepository.findLatestPayInfo(meetListByMemberId);
		Map<Meet, Pay> payInfoMap = latestPayInfoList.stream()
			.collect(Collectors.toMap(Pay::getMeet, Function.identity()));

		return membersInMeetList.stream()
			.map(meet -> {
				Pay pay = payInfoMap.get(meet);
				LocalDateTime lastDate = pay.getCreatedAt();
				return MeetInfo.of(meet, findMember, lastDate);
			})
			.sorted(Comparator.comparing(MeetInfo::topFixed).reversed()
				.thenComparing(MeetInfo::lastPayDate).reversed())
			.toList();
	}

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

	public Meet getMeet(long meetId) {
		// Meet meet = meetRepository.findById(meetId)
		// 	.orElseThrow(() -> new IllegalArgumentException("not found: " + meetId));

		return meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("not found: " + meetId));
	}

	public Optional<Meet> findById(long meetId) {
		return meetRepository.findById(meetId);
	}

	public HighlightResponse getHighlight(long meetId) {
		Object[] queryResult = meetRepository.getHighlight(meetId);
		MeetResponse meetResponse = new MeetResponse((Meet)queryResult[0], 960401);
		return new HighlightResponse(meetResponse);
	}

}
