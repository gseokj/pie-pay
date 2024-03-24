package com.pay.pie.domain.application;

import static com.pay.pie.domain.participant.entity.QParticipant.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.application.dto.InsteadDto;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.payInstead.dao.PayInsteadRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PayInsteadService {

	private final RedisTemplate<String, String> redisTemplate;
	private final SimpMessagingTemplate messagingTemplate;
	private final ParticipantRepository participantRepository;
	private final PayInsteadRepository payInsteadRepository;
	private final JPAQueryFactory jpaQueryFactory;

	/*
	대신내주기 요청
	 */
	public InsteadDto requestPayInstead(Long payId, Long borrowerId) {
		// Pay instead request logic

		// Save pay instead request in Redis as hash
		Map<String, Object> payInsteadInfo = new HashMap<>();
		payInsteadInfo.put("borrowerId", borrowerId);
		redisTemplate.opsForHash().putAll("payId:" + payId + ":instead", payInsteadInfo);

		return InsteadDto.builder()
			.payId(payId)
			.borrowerId(borrowerId)
			// .lenderId(null)
			.build();
	}

	/*
	대신내주기 승낙
	 */
	public InsteadDto respondToPayInstead(Long payId, Long borrowerId, Long lenderId) {
		// Pay instead response logic

		// Retrieve existing pay instead request from Redis hash
		Map<Object, Object> payInsteadInfo = redisTemplate.opsForHash().entries("payId:" + payId + ":instead");

		// borrowId 일치하면, update lenderId and agreed status
		if (payInsteadInfo.containsKey("borrowerId")) {
			Long existingBorrowId = (Long)payInsteadInfo.get("borrowerId");
			if (existingBorrowId.equals(borrowerId)) {
				payInsteadInfo.put("lenderId", lenderId);
				redisTemplate.opsForHash().putAll("payId:" + payId + ":instead", payInsteadInfo);

				Participant participantBorrower = jpaQueryFactory
					.selectFrom(participant)
					.where(participant.member.id.eq(borrowerId))
					.fetchOne();

				//borrowId 결제동의 정보도 redis에 저장
				redisTemplate.opsForHash().put(
					"payId:" + payId + ":agree",
					"participantId:" + participantBorrower.getId(),
					"true"
				);

			}
		}

		return InsteadDto.builder()
			.payId(payId)
			.borrowerId(borrowerId)
			.lenderId(lenderId)
			.build();
	}
}
