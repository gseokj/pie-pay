package com.pay.pie.domain.participant.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.dto.request.ParticipantReq;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.dao.PayRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

	private final ParticipantRepository participantRepository;
	private final PayRepository payRepository;

	@Override
	public void selectParticipant(Long payId, List<ParticipantReq> participants) {
		for (ParticipantReq info : participants) {
			Participant participant = Participant.builder()
				.id(info.getId())
				.pay(payRepository.findById(payId).orElseThrow(
					() -> new IllegalArgumentException("없는 결제 건임")
				))
				.member(info.getMember())
				.isDrinkAlcohol(info.getIsDrinkAlcohol())
				.build();
			log.info("참석자: {}", participant);
			participantRepository.save(participant);
		}
	}
}
