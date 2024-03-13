package com.pay.pie.domain.meet.service;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.meet.dto.AddMeetRequest;
import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final잉 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class MeetService {
	private final MeetRepository meetRepository;

	// 모임 추가 매서드
	@Transactional
	public Meet save(AddMeetRequest request) {
		return meetRepository.save(request.toEntity());
	}

}
