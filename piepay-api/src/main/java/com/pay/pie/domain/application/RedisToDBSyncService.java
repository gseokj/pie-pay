package com.pay.pie.domain.application;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

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

import jakarta.transaction.Transactional;
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
	
	/*
	Redis -> DB 저장
	 */
	@Transactional
	public void syncDataFromRedisToDB(Long payId) {
		// 1. Redis에서 모든 참가자의 동의 정보 조회
		Map<Object, Object> agreementData = redisTemplate.opsForHash().entries("payId:" + payId + ":true");
		log.info("agreeDataFromRedis: {}", agreementData);

		// 2. Redis[agree Data] -> participant update
		agreementData.entrySet().stream()
			.map(entry -> {
				String participantIdField = (String)entry.getKey();
				Long participantId = Long.parseLong(participantIdField.split(":")[1]);
				Participant participant = participantRepository.findById(participantId).orElse(null);
				if (participant != null) {
					participant.setPayAgree(true);
				}
				return participant;
			})
			.filter(Objects::nonNull)      // Filter out null participants
			.forEach(participantRepository::save);

		// 3. Redis[대신내주기 Data] -> DB에 저장
		syncPayInsteadDataFromRedisToDB(payId);

		// 4. pay상태 update
		Pay pay = payRepository.findById(payId)
			.orElseThrow(() -> new IllegalArgumentException("없는 PayId"));
		pay.setPayStatus(Pay.PayStatus.ING);
		payRepository.save(pay);
	}

	/*
	Redis[대신내주기 Data] -> payInstead update
	 */
	public void syncPayInsteadDataFromRedisToDB(Long payId) {
		// Process payInstead data
		Set<String> insteadKeys = redisTemplate.keys("payId:" + payId + ":instead:*");
		if (insteadKeys != null) {
			List<CompletableFuture<PayInstead>> futures = insteadKeys.stream()
				.map(insteadKey -> CompletableFuture.supplyAsync(() -> {
					Map<Object, Object> insteadData = redisTemplate.opsForHash().entries(insteadKey);

					Long borrowerId = Long.parseLong((String)insteadData.get("borrowerId"));
					Long lenderId = Long.parseLong((String)insteadData.get("lenderId"));

					// pay, borrower, lender FETCH!
					Pay pay = payRepository.findById(payId).orElse(null);
					Member borrower = memberRepository.findById(borrowerId).orElse(null);
					Member lender = memberRepository.findById(lenderId).orElse(null);

					if (pay != null && borrower != null && lender != null) {
						PayInstead payInstead = PayInstead.builder()
							.pay(pay)
							.borrower(borrower)
							.lender(lender)
							.amount(0L)
							.build();

						return payInsteadRepository.save(payInstead);
					} else {
						return null;
					}
				}))
				.toList();

			CompletableFuture<Void> allFutures = CompletableFuture
				.allOf(futures.toArray(new CompletableFuture[futures.size()]));

			allFutures.join();      // Wait for all futures to complete
		}
	}

}
