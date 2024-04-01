package com.pay.pie.domain.meet.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.dto.HighlightResponse;
import com.pay.pie.domain.meet.dto.MeetResponse;
import com.pay.pie.domain.meet.dto.UpdateInvitationRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.dto.request.UpdateMeetNameRequest;
import com.pay.pie.domain.meet.dto.response.MeetDetailResponse;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.global.util.S3Util;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final이 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class MeetService {

	private final MeetRepository meetRepository;
	private final S3Util s3Util;

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
