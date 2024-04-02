package com.pay.pie.domain.meet.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pay.pie.domain.meet.dto.MeetPaymentInfo;
import com.pay.pie.domain.meet.dto.MonthInfo;
import com.pay.pie.domain.meet.dto.request.CreateMeetRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.dto.response.MeetDetailResponse;
import com.pay.pie.domain.meet.dto.response.MeetHighlightResponse;
import com.pay.pie.domain.meet.dto.response.MeetInfo;
import com.pay.pie.domain.meet.dto.response.MeetMemberInfo;
import com.pay.pie.domain.meet.dto.response.UpdateInvitationResponse;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetQueryRepository;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.exception.MemberException;
import com.pay.pie.domain.member.exception.MemberExceptionCode;
import com.pay.pie.domain.memberMeet.entity.MemberMeet;
import com.pay.pie.domain.memberMeet.repository.MemberMeetRepository;
import com.pay.pie.domain.orderMenu.repository.OrderMenuRepository;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.dto.MemberParticipationCount;
import com.pay.pie.domain.participant.dto.ParticipantStatistics;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.global.util.S3Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetService {

	private final S3Util s3Util;
	private final PayRepository payRepository;
	private final MeetRepository meetRepository;
	private final MemberRepository memberRepository;
	private final OrderMenuRepository orderMenuRepository;
	private final MeetQueryRepository meetQueryRepository;
	private final MemberMeetRepository memberMeetRepository;
	private final ParticipantRepository participantRepository;

	public MeetDetailResponse getMeetInfo(long meetId) {

		Meet findMeet = meetRepository.findMeetInfo(meetId);

		return MeetDetailResponse.of(findMeet, findMeet.getMemberMeetList().size());
	}

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

		List<Long> meetListByMemberId = meetRepository.findMeetListByMemberId(memberId);

		List<Meet> membersInMeetList = meetRepository.findMembersInMeetList(meetListByMemberId);

		List<Pay> latestPayInfoList = payRepository.findLatestPayInfo(meetListByMemberId);
		Map<Meet, Pay> payInfoMap = latestPayInfoList.stream()
			.collect(Collectors.toMap(Pay::getMeet, Function.identity()));

		return membersInMeetList.stream()
			.map(meet -> {
				Pay pay = payInfoMap.get(meet);
				if (pay == null) {
					return MeetInfo.createMeetInfo(meet, findMember);
				}
				LocalDateTime lastDate = pay.getCreatedAt();
				return MeetInfo.lastPayMeetInfo(meet, findMember, lastDate);
			})
			.sorted(Comparator.comparing(MeetInfo::topFixed).reversed())
			.toList();
	}

	@Transactional
	public MeetInfo createMeet(Long memberId, CreateMeetRequest request) {

		Member findMember = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(MemberExceptionCode.NOT_FOUND_MEMBER));

		Meet meet = new Meet(request.meetName());
		MemberMeet memberMeet = new MemberMeet(findMember, meet);

		meetRepository.save(meet);
		memberMeetRepository.save(memberMeet);

		return MeetInfo.createMeetInfo(meet, findMember);
	}

	@Transactional
	public UpdateInvitationResponse updateMeetInvitation(long id) {
		Meet meet = meetRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found: " + id));
		return new UpdateInvitationResponse(meet.updateInvitation());
	}

	public List<MeetMemberInfo> getMeetMemberInfo(Long meetId) {

		List<Member> member = memberRepository.findMember(meetId);
		List<ParticipantStatistics> participantStatics = participantRepository.getParticipantStatics(member, meetId);
		Map<Long, ParticipantStatistics> participantStatisticsMap = participantStatics.stream()
			.collect(Collectors.toMap(
					ParticipantStatistics::getMemberId,
					Function.identity()
				)
			);

		return member.stream()
			.map(m -> MeetMemberInfo.of(
				m, participantStatisticsMap.get(m.getId())
			))
			.toList();
	}

	public Meet getMeet(long meetId) {
		// Meet meet = meetRepository.findById(meetId)
		// 	.orElseThrow(() -> new IllegalArgumentException("not found: " + meetId));

		return meetRepository.findById(meetId).orElseThrow(() -> new IllegalArgumentException("not found: " + meetId));
	}

	public Optional<Meet> findById(long meetId) {
		return meetRepository.findById(meetId);
	}

	public MeetHighlightResponse getHighlight(Long meetId) {

		// 모임 총 결제 금액과 총 만남 횟수
		MeetPaymentInfo meetPaymentInfo = meetQueryRepository.getTotalMountAndMeetCount(meetId);

		// 모임에서 발생한 결제 리스트
		List<Pay> payList = payRepository.findPayList(meetId);

		// 모임에 멤버가 각 참여한 횟수 정보
		List<MemberParticipationCount> maxParticipationMember = participantRepository.getMaxParticipationMember(
			payList);

		MemberParticipationCount memberParticipationCount = null;
		if (!maxParticipationMember.isEmpty()) {
			memberParticipationCount = maxParticipationMember.get(0);
		}

		Long alcoholCount = orderMenuRepository.getAlcoholCount(payList);

		Map<Integer, Long> monthPayDate = payList.stream()
			.collect(Collectors.groupingBy((Pay::getMonth), Collectors.counting()));

		List<MonthInfo> monthInfos = new ArrayList<>();

		for (Integer key : monthPayDate.keySet()) {
			monthInfos.add(new MonthInfo(key, monthPayDate.get(key)));
		}

		return MeetHighlightResponse.of(meetPaymentInfo, alcoholCount, memberParticipationCount, monthInfos);
	}

}
