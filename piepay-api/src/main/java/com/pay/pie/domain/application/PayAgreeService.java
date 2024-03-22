package com.pay.pie.domain.application;

import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.application.dto.reponse.AgreeRes;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.entity.Participant;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// @AllArgsConstructor
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayAgreeService {

	private final RedisTemplate<String, String> redisTemplate;
	private final SimpMessagingTemplate messagingTemplate;
	private final ParticipantRepository participantRepository;

	public AgreeRes respondToAgreement(Long payId, Long participantId) {
		// 동의 로직
		Participant participant = participantRepository.findById(participantId)
			.orElseThrow(() -> new IllegalArgumentException("없는 참가자"));

		// Redis
		redisTemplate.opsForHash().put(
			"payId:" + payId + ":agree",
			"participantId:" + participantId, "true"
		);

		// Redis에 모든 참가자 동의가 있는지 확인
		boolean allAgreed = checkAllParticipantsAgreed(payId);

		return AgreeRes.of(participant, allAgreed);
	}

	/*
	모든 참여자가 동의했는지 확인
	 */
	private boolean checkAllParticipantsAgreed(Long payId) {
		Long totalParticipants = participantRepository.getTotalParticipants(payId);
		// Redis 에서 해당 payId에 대한 모든 참가자의 동의 정보를 조회
		Map<Object, Object> agreeInfo = redisTemplate.opsForHash().entries("payId:" + payId + ":agree");
		// Redis 에 저장된 동의한 참가자 수
		int agreedParticipantsCount = agreeInfo.size();
		// 모든 참가자가 동의했는지 여부를 확인
		return agreedParticipantsCount == totalParticipants;
	}

	//
	// 	/*
	// 	QR 생성
	// 	 */
	// 	private byte[] generateQRCode(Long payId) throws WriterException, IOException {
	//
	// 		String url = "https://___/your-receipt/" + payId;
	// 		int width = 200;
	// 		int height = 200;
	// 		BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);
	//
	// 		ByteArrayOutputStream out = new ByteArrayOutputStream();
	// 		MatrixToImageWriter.writeToStream(bitMatrix, "PNG", out);
	// 		log.info("QR 생성!");
	// 		return out.toByteArray();
	// 	}
	//
	// 	/*
	// 	QR코드 -> 클라이언트로 전송
	// 	 */
	// 	private void sendQRCodeToClient(Long openerId, byte[] qrCodeimage) {
	// 		messagingTemplate.convertAndSendToUser(
	// 			openerId.toString(), "/sub/qr/{payId}", qrCodeimage
	// 		);
	// 	}
}
