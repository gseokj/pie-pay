package com.pay.pie.domain.participant.application;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.entity.Participant;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// @AllArgsConstructor
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AgreeParticipantServiceImpl implements AgreeParticipantService {

	private final RedisTemplate<String, String> redisTemplate;
	private final SimpMessagingTemplate messagingTemplate;
	private final ParticipantRepository participantRepository;

	@Override
	public void requestAgreement(Long participantId) {
		// Agreement request logic
		Participant participant = participantRepository.findById(participantId).orElseThrow(
			() -> new IllegalArgumentException("해당 참여자 없음")
		);
		log.info("참여자 동의여부 {}", participant.getPayAgree());

		participant.setPayAgree(true);
		log.info("참여자 동의여부 {}", participant.getPayAgree());
		participantRepository.save(participant);

		// Save participant's agreement request in Redis or DB
		redisTemplate.opsForValue().set("agreement:" + participantId, "pending");
		log.info("옴?{}", redisTemplate.opsForValue());
		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/topic/agreement/request",
			"Agreement requested for participantId: " + participantId);

	}

	@Override
	public void respondToAgreement(Long participantId, boolean agreed) {
		// Agreement response logic
		// Update agreement status in Redis or DB
		redisTemplate.opsForValue().set("agreement:" + participantId, agreed ? "agreed" : "rejected");
		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/topic/agreement/response",
			"Agreement response for participantId: " + participantId + ", Agreed: " + agreed);
	}
}
