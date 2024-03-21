package com.pay.pie.domain.participant.application;

import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.application.RedisToDBSyncService;
import com.pay.pie.domain.participant.dao.ParticipantRepository;

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
	private final RedisToDBSyncService redisToDBSyncService;

	@Override
	public void respondToAgreement(Long payId, Long participantId) {
		// Agreement response logic
		Long totalParticipants = participantRepository.getTotalParticipants(payId);

		// Update agreement status in Redis
		redisTemplate.opsForHash().put("payId:" + payId + ":agree", "participantId:" + participantId, "true");
		// redis에 모든 참가자 동의가 있는지 확인
		boolean allAgreed = checkAllParticipantsAgreed(payId, totalParticipants);
		if (allAgreed) {
			// 모두 동의하면 redis -> DB
			redisToDBSyncService.syncDataFromRedisToDB(payId);
			// QR generate API 넘어가기

		}

		// Send message to relevant participants via WebSocket
		messagingTemplate.convertAndSend("/sub/" + payId,
			"Agreement response for participantId: " + participantId);
	}

	/*
	모든 참여자가 동의했는지 확인
	 */
	private boolean checkAllParticipantsAgreed(Long payId, Long totalParticipants) {
		// Redis 에서 해당 payId에 대한 모든 참가자의 동의 정보를 조회
		Map<Object, Object> agreeInfo = redisTemplate.opsForHash().entries("payId:" + payId + ":agree");

		// Redis 에 저장된 동의한 참가자 수
		int agreedParticipantsCount = agreeInfo.size();

		// 모든 참가자가 동의했는지 여부를 확인
		return agreedParticipantsCount == totalParticipants;
	}
}
