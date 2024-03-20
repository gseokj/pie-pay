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

	private RedisTemplate<String, String> redisTemplate;
	private SimpMessagingTemplate messagingTemplate;
	private ParticipantRepository participantRepository;

	@Override
	public void requestPayInstead(Long participantId, Long payInsteadId) {
		// Pay instead request logic
		// Save pay instead request in Redis or DB
		// Send message to relevant participants via WebSocket

	}

	@Override
	public void respondToPayInstead(Long participantId, boolean agreed) {
		// Pay instead response logic
		// Update pay instead status in Redis or DB
		// Send message to relevant participants via WebSocket

	}
}
