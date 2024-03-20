package com.pay.pie.domain.pay.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayServiceImpl implements PayService {

	private final PayRepository payRepository;
	private final MeetRepository meetRepository;

	public List<Pay> findPayByMeetId(long meetId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));
		return payRepository.findByMeetOrderByCreatedAtDesc(meet);
	}

	public Pay findRecentPayByMeetId(long meetId) {
		Meet meet = meetRepository.findById(meetId)
			.orElseThrow(() -> new IllegalArgumentException("해당 meetId을 가진 Meet을 찾을 수 없음"));

		return payRepository.findFirstByMeetOrderByCreatedAtDesc(meet);
	}
}
