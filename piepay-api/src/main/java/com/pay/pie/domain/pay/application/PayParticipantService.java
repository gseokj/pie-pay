package com.pay.pie.domain.pay.application;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.hibernate.mapping.Map;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayParticipantService {

	private Map<Long, List<StompSession>> paySessionsMap = new ConcurrentHashMap<>();

	public void addParticipant(Long payId, StompSession session) {
		paySessionsMap.computeIfAbsent(payId, k -> new ArrayList<>()).add(session);
	}

	public void removeParticipant(Long payId, StompSession session) {
		List<StompSession> sessions = paySessionsMap.get(payId);
		if (sessions != null) {
			sessions.remove(session);
			if (sessions.isEmpty()) {
				paySessionsMap.remove(payId);
			}
		}
	}

	public void broadcastPayAgree(Long payId, boolean payAgree) {
		List<StompSession> sessions = paySessionsMap.get(payId);
		if (sessions != null) {
			String destination = "/topic/pay/" + payId + "/payAgree";
			sessions.forEach(session -> {
				session.send(destination, payAgree);
			});
		}
	}
}
