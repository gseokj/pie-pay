package com.pay.pie.domain.payInstead.application;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.participant.dao.ParticipantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PayInsteadServiceImpl implements PayInsteadService {

	private final RedisTemplate<String, String> redisTemplate;
	private final SimpMessagingTemplate messagingTemplate;
	private final ParticipantRepository participantRepository;

	@Override
	public void requestPayInstead(Long payId, Long borrowId) {
		// Pay instead request logic

		// Save pay instead request in Redis as hash
		Map<String, Object> payInsteadInfo = new HashMap<>();
		payInsteadInfo.put("borrowId", borrowId);
		redisTemplate.opsForHash().putAll("payId:" + payId + ":instead", payInsteadInfo);

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/sub/" + payId,
			"Pay instead requested for participantId: " + borrowId);
	}

	@Override
	public void respondToPayInstead(Long payId, Long borrowId, Long lenderId, boolean agreed) {
		// Pay instead response logic

		// Retrieve existing pay instead request from Redis hash
		Map<Object, Object> payInsteadInfo = redisTemplate.opsForHash().entries("payId:" + payId + ":instead");

		// borrowId 일치하면, update lenderId and agreed status
		if (payInsteadInfo.containsKey("borrowId")) {
			Long existingBorrowId = (Long)payInsteadInfo.get("borrowId");
			if (existingBorrowId.equals(borrowId)) {
				payInsteadInfo.put("lenderId", lenderId);
				redisTemplate.opsForHash().putAll("payId:" + payId + ":instead", payInsteadInfo);

				//borrowId 결제동의 정보도 redis에 저장
				redisTemplate.opsForHash().put("payId:" + payId + ":agree", "participantId:" + borrowId, "true");

				// Send message to relevant participants via WebSocket
				messagingTemplate.convertAndSend("/sub/" + payId,
					"Pay instead response for participantId: " + borrowId + ", Agreed: " + agreed);
			}
		}
	}
}
