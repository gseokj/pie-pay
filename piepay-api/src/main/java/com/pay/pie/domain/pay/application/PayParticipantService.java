package com.pay.pie.domain.pay.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayParticipantService {

	// private final ParticipantRepository participantRepository;
	// private final PayRepository payRepository;
	// private Map<Long, List<StompSession>> paySessionsMap = new ConcurrentHashMap<>();
	//
	// /*
	// 식별된 참가자를 추가
	//  */
	// public void addParticipant(Long payId, StompSession session) {
	// 	paySessionsMap.computeIfAbsent(payId, k -> new ArrayList<>()).add(session);
	// }
	//
	// /*
	// 더 이상 연결된 세션이 없으면 해당 payId 항목 맵에서 제거
	//  */
	// public void removeParticipant(Long payId, StompSession session) {
	// 	List<StompSession> sessions = paySessionsMap.get(payId);
	// 	if (sessions != null) {
	// 		sessions.remove(session);
	// 		if (sessions.isEmpty()) {
	// 			paySessionsMap.remove(payId);
	// 		}
	// 	}
	// }
	//
	// /*
	// payAgree를 payId와 연결된 모든 세션에게 브로드캐스트
	//  */
	// public void broadcastPayAgree(Long payId, boolean payAgree) {
	// 	List<StompSession> sessions = paySessionsMap.get(payId);
	// 	if (sessions != null) {
	// 		String destination = "/topic/pay/" + payId + "/payAgree";
	// 		sessions.forEach(session -> {
	// 			session.send(destination, payAgree);
	// 		});
	// 	}
	// }
	//
	// public boolean processAgreement(Long payId, Long participantId, boolean payAgree) {
	//
	// 	try {
	// 		// payId를 사용하여 결제 정보를 가져옵니다.
	// 		Pay pay = payRepository.findById(payId)
	// 			.orElseThrow(() -> new RuntimeException("Pay not found with id: " + payId));
	//
	// 		// participantId를 사용하여 해당 결제에 대한 참가자 정보를 가져옵니다.
	// 		Participant participant = participantRepository.findById(participantId)
	// 			.orElseThrow(() -> new RuntimeException("Participant not found with id: " + participantId));
	//
	// 		// 동의 상태를 업데이트합니다.
	// 		participant.setPayAgree(payAgree);
	//
	// 		// 참가자 정보를 저장합니다.
	// 		participantRepository.save(participant);
	//
	// 		// 동의 처리가 성공적으로 완료되었음을 반환합니다.
	// 		return true;
	// 	} catch (Exception e) {
	// 		// 동의 처리 중에 예외가 발생한 경우
	// 		log.error("Error processing agreement: {}", e.getMessage());
	// 		return false;
	// 	}
	// }
}
