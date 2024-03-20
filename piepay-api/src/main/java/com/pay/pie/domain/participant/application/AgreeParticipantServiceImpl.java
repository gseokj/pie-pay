package com.pay.pie.domain.participant.application;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.participant.dao.ParticipantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AgreeParticipantServiceImpl implements AgreeParticipantService {

	private RedisTemplate<String, String> redisTemplate;
	private SimpMessagingTemplate messagingTemplate;
	private ParticipantRepository participantRepository;

	@Override
	public void requestAgreement(Long participantId) {
		// Agreement request logic
		// Save participant's agreement request in Redis or DB
		// Send message to relevant participants via WebSocket

	}

	@Override
	public void respondToAgreement(Long participantId, boolean agreed) {
		// Agreement response logic
		// Update agreement status in Redis or DB
		// Send message to relevant participants via WebSocket

	}
}
