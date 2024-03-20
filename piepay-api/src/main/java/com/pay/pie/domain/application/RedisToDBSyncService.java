package com.pay.pie.domain.application;

import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.entity.Participant;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisToDBSyncService {

	private final RedisTemplate<String, String> redisTemplate;
	private final ParticipantRepository participantRepository;

	// 주기적으로 실행되어 Redis에 저장된 정보를 데이터베이스에 저장합니다.
	@Scheduled(fixedRate = 60000) // 매 1분마다 실행하도록 스케줄링합니다.
	public void syncDataFromRedisToDatabase() {
		// Redis에서 정보를 읽어옵니다.
		Map<Object, Object> dataFromRedis = redisTemplate.opsForHash().entries("agreement");

		// 읽어온 정보를 데이터베이스에 저장합니다.
		for (Map.Entry<Object, Object> entry : dataFromRedis.entrySet()) {
			Long participantId = Long.parseLong(entry.getKey().toString());
			boolean payAgree = Boolean.parseBoolean(entry.getValue().toString());
			Participant participant = participantRepository.findById(participantId).orElse(null);
			if (participant != null) {
				participant.setPayAgree(payAgree);
				participantRepository.save(participant);
			}
		}
	}
}
