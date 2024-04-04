package com.pay.pie.domain.application;

import java.util.Map;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.dao.MemberRepository;
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
		Map<Object, Object> agreementData = redisTemplate.opsForHash().entries("payId" + payId + "true");
		// Map<Object, Object> insteadData = redisTemplate.opsForHash().entries("payId" + payId + "instead");
		log.info("agreeDataFromRedis: {}", agreementData);
		// log.info("insteadDataFromRedis: {}", insteadData);

		// Process agreement data
		for (Map.Entry<Object, Object> entry : agreementData.entrySet()) {
			String participantIdField = (String)entry.getKey();
			Long participantId = Long.parseLong(participantIdField.split(":")[1]); // 필드 값을 파싱하여 participantId를 가져옵니다.
			Participant participant = participantRepository.findById(participantId).orElse(null);
			if (participant != null) {
				participant.setPayAgree(true);
				participantRepository.save(participant);
			}
		}
		// for (Map.Entry<Object, Object> entry : agreementData.entrySet()) {
		// 	Long participantId = Long.parseLong(entry.getKey().toString());
		// 	boolean payAgree = Boolean.parseBoolean(entry.getValue().toString());
		// 	Participant participant = participantRepository.findById(participantId).orElse(null);
		// 	if (participant != null) {
		// 		participant.setPayAgree(payAgree);
		// 		participantRepository.save(participant);
		// 	}
		// }

		// Process payInstead data
		Set<String> insteadKeys = redisTemplate.keys("payId:" + payId + ":instead:*");
		if (insteadKeys != null) {
			for (String insteadKey : insteadKeys) {
				Map<Object, Object> insteadData = redisTemplate.opsForHash().entries(insteadKey);

				Long borrowerId = Long.parseLong((String)insteadData.get("borrowerId"));
				Long lenderId = Long.parseLong((String)insteadData.get("lenderId"));

				// redis -> DB에 저장
				PayInstead payInstead = PayInstead.builder()
					.pay(payRepository.findById(payId).orElse(null))
					.borrower(memberRepository.findById(borrowerId).orElse(null))
					.lender(memberRepository.findById(lenderId).orElse(null))
					.build();

				payInsteadRepository.save(payInstead);
			}
		}

		// for (Map.Entry<Object, Object> entry : insteadData.entrySet()) {
		// 	Pay pay = payRepository.findById(payId)
		// 		.orElseThrow(
		// 			() -> new IllegalArgumentException("없는 Pay 결제건 입니다.")
		// 		);
		// 	Member borrower = memberRepository.findById(Long.parseLong(entry.getValue().toString()))
		// 		.orElseThrow(
		// 			() -> new IllegalArgumentException("없는 회원 입니다.")
		// 		);
		// 	Member lender = memberRepository.findById(Long.parseLong(entry.getValue().toString()))
		// 		.orElseThrow(
		// 			() -> new IllegalArgumentException("없는 회원 입니다.")
		// 		);

		// Redis 에서 payId 데이터 삭제(트랜잭션 영향 안받음)
		// redisTemplate.delete("payId" + payId + "true");
		// redisTemplate.delete("payId" + payId + "false");
		// redisTemplate.delete("payId" + payId + "instead");

		// pay Status 변경
		Pay pay = payRepository.findById(payId)
			.orElseThrow(() -> new IllegalArgumentException("없는 PayId"));
		pay.setPayStatus(Pay.PayStatus.ING);
		payRepository.save(pay);
	}
}
