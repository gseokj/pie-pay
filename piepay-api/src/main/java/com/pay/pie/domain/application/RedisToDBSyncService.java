package com.pay.pie.domain.application;

import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.domain.payInstead.dao.PayInsteadRepository;
import com.pay.pie.domain.payInstead.entity.PayInstead;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisToDBSyncService {

	private final RedisTemplate<String, String> redisTemplate;
	private final PayRepository payRepository;
	private final ParticipantRepository participantRepository;
	private final PayInsteadRepository payInsteadRepository;
	private final MemberRepository memberRepository;

	// Redis -> DB 저장
	public void syncDataFromRedisToDB(Long payId) {
		// Redis 에서 정보를 읽어옵니다.
		Map<Object, Object> agreementData = redisTemplate.opsForHash().entries("payId" + payId + "agree");
		Map<Object, Object> insteadData = redisTemplate.opsForHash().entries("payId" + payId + "instead");
		log.info("agreeDataFromRedis: {}", agreementData);
		log.info("insteadDataFromRedis: {}", insteadData);

		// Process agreement data
		for (Map.Entry<Object, Object> entry : agreementData.entrySet()) {
			Long participantId = Long.parseLong(entry.getKey().toString());
			boolean payAgree = Boolean.parseBoolean(entry.getValue().toString());
			Participant participant = participantRepository.findById(participantId).orElse(null);
			if (participant != null) {
				participant.setPayAgree(payAgree);
				participantRepository.save(participant);
			}
		}

		// Process payInstead data
		for (Map.Entry<Object, Object> entry : insteadData.entrySet()) {
			Pay pay = payRepository.findById(payId)
				.orElseThrow(
					() -> new IllegalArgumentException("없는 Pay 결제건 입니다.")
				);
			Member borrower = memberRepository.findById(Long.parseLong(entry.getValue().toString()))
				.orElseThrow(
					() -> new IllegalArgumentException("없는 회원 입니다.")
				);
			Member lender = memberRepository.findById(Long.parseLong(entry.getValue().toString()))
				.orElseThrow(
					() -> new IllegalArgumentException("없는 회원 입니다.")
				);

			PayInstead payInstead = PayInstead.builder()
				.pay(pay)
				.borrower(borrower)
				.lender(lender)
				.build();

			payInsteadRepository.save(payInstead);

		}

		// Redis 에서 payId 데이터 삭제
		redisTemplate.delete("payId" + payId + "agree");
		redisTemplate.delete("payId" + payId + "instead");
	}
}
