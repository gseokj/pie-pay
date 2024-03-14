package com.pay.pie.domain.meet.service;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.dto.UpdateInvitationRequest;
import com.pay.pie.domain.meet.dto.UpdateMeetImageRequest;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final이 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class MeetService {
	private final MeetRepository meetRepository;

	// 모임 추가 매서드
	public Meet save(AddMeetRequest request) {
		return meetRepository.save(request.toEntity());
	}

	@Transactional // import 할 수 있는게 2가지가 있음. 혹시 오류나면 체크
	public Meet update(long id, UpdateInvitationRequest request) {
		Meet meet = meetRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("not found: " + id));

		meet.updateInvitation();

		return meet;
	}

	@Transactional
	public Meet update(long id, UpdateMeetImageRequest request) {
		Meet meet = meetRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("not found: " + id));
		System.out.println("겟이미지 " + request.getMeetImage());
		meet.updateMeetImage(request.getMeetImage());

		return meet;
	}
}
