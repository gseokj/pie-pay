package com.pay.pie.domain.payInstead.application;

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
	public void requestPayInstead(Long participantId, Long payInsteadId) {
		// Pay instead request logic
		// Save pay instead request in Redis or DB
		redisTemplate.opsForValue().set("payInstead:" + participantId, "requested");
		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/topic/payinstead/request",
			"Pay instead requested for participantId: " + participantId);

	}

	@Override
	public void respondToPayInstead(Long participantId, boolean agreed) {
		// Pay instead response logic
		// Update pay instead status in Redis or DB
		redisTemplate.opsForValue().set("payInstead:" + participantId, agreed ? "agreed" : "rejected");
		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/topic/payinstead/response",
			"Pay instead response for participantId: " + participantId + ", Agreed: " + agreed);

	}
}
