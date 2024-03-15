package com.pay.pie.domain.participant.application;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.dto.reponse.ParticipantRes;
import com.pay.pie.domain.participant.dto.request.ParticipantReq;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

	private final ParticipantRepository participantRepository;
	private final MemberRepository memberRepository;
	private final PayRepository payRepository;

	@Override
	public List<ParticipantRes> selectParticipant(Long openerId, List<ParticipantReq> participants) {

		List<ParticipantRes> participantResList = new ArrayList<>();

		// Pay 테이블 생성
		Pay pay = payRepository.save(Pay.builder()
			.payStatus(Pay.PayStatus.OPEN)
			// .meet(meetId)
			.openerId(openerId)
			.build());

		// 참여자 저장
		for (ParticipantReq info : participants) {
			Participant participant = Participant.builder()
				.pay(pay)
				.member(memberRepository.findById(info.getMemberId())
					.orElseThrow(
						() -> new IllegalArgumentException("없는 사용자임")
					))
				.isDrinkAlcohol(info.getIsDrinkAlcohol())
				.build();
			log.info("참석자: {}", participant);
			participantRepository.save(participant);
			ParticipantRes participantRes = ParticipantRes.of(participant);
			participantResList.add(participantRes);
		}

		return participantResList;
	}
}
