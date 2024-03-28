package com.pay.pie.domain.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayInsteadService {

	// private final RedisTemplate<String, String> redisTemplate;
	// private final SimpMessagingTemplate messagingTemplate;
	// private final ParticipantRepository participantRepository;
	// private final PayRepository payRepository;
	// private final PayInsteadRepository payInsteadRepository;
	// private final JPAQueryFactory jpaQueryFactory;
	//
	// /*
	// 대신내주기 요청
	//  */
	// // public InsteadDto requestPayInstead(Long payId, Long borrowerId) {
	// // 	// Pay instead request logic
	// //
	// // 	// Save pay instead request in Redis as hash
	// // 	Map<String, Object> payInsteadInfo = new HashMap<>();
	// // 	payInsteadInfo.put("borrowerId", borrowerId);
	// // 	redisTemplate.opsForHash().putAll("payId:" + payId + ":instead", payInsteadInfo);
	// //
	// // 	return InsteadDto.builder()
	// // 		.payId(payId)
	// // 		.borrowerId(borrowerId)
	// // 		// .lenderId(null)
	// // 		.build();
	// // }
	//
	// /*
	// 대신내주기 승낙
	//  */
	// public InsteadDto respondToPayInstead(InsteadDto insteadAgreeReq) {
	// 	// Pay instead response logic
	// 	log.info("borrowerId: {}", insteadAgreeReq.getBorrowerId());
	// 	Participant participantBorrower = participantRepository.findByMemberIdAndPayId(
	// 		insteadAgreeReq.getBorrowerId(),
	// 		insteadAgreeReq.getPayId());
	//
	// 	// Retrieve existing pay instead request from Redis hash
	// 	// Map<Object, Object> payInsteadInfo = redisTemplate.opsForHash().entries("payId:" + payId + ":instead");
	//
	// 	// borrowId 일치하면, update lenderId and agreed status
	// 	// if (payInsteadInfo.containsKey("borrowerId")) {
	// 	// 	Long existingBorrowId = (Long)payInsteadInfo.get("borrowerId");
	// 	// 	if (existingBorrowId.equals(borrowerId)) {
	// 	// 		payInsteadInfo.put("lenderId", lenderId);
	// 	// 		redisTemplate.opsForHash().putAll("payId:" + payId + ":instead", payInsteadInfo);
	// 	//
	// 	// 		Participant participantBorrower = jpaQueryFactory
	// 	// 			.selectFrom(participant)
	// 	// 			.where(participant.member.id.eq(borrowerId))
	// 	// 			.fetchOne();
	// 	//
	// 	// 		//borrowId 결제동의 정보도 redis에 저장
	// 	// 		redisTemplate.opsForHash().put(
	// 	// 			"payId:" + payId + ":agree",
	// 	// 			"participantId" + participantBorrower.getId(), participantBorrower.getId().toString()
	// 	// 		);
	// 	//
	// 	// 	}
	// 	// }
	//
	// 	// redisTemplate.opsForHash().put(
	// 	// 	"payId:" + payId + ":true",
	// 	// 	"participantId:" + participantBorrower.getId(),
	// 	// 	"borrowerId:" + borrowerId + ":lenderId:" + lenderId
	// 	// );
	//
	// 	redisTemplate.opsForHash().put(
	// 		"payId:" + insteadAgreeReq.getPayId() + ":true",
	// 		"participantId:" + participantBorrower.getId(),
	// 		participantBorrower.getId().toString()
	// 	);
	//
	// 	boolean allAgreed = checkAllParticipantsAgreed(insteadAgreeReq.getPayId());
	// 	if (allAgreed) {
	// 		// redis -> DB
	// 		// redisToDBSyncService.syncDataFromRedisToDB(agreeReq.getPayId());
	// 		// pay Status 변경
	// 		Pay pay = payRepository.findById(insteadAgreeReq.getPayId())
	// 			.orElseThrow(() -> new IllegalArgumentException("없는 PayId"));
	// 		pay.setPayStatus(Pay.PayStatus.ING);
	// 		payRepository.save(pay);
	// 	}
	//
	// 	redisTemplate.opsForHash()
	// 		.delete("payId:" + insteadAgreeReq.getPayId() + ":false", "participantId:" + participantBorrower.getId());
	//
	// 	return InsteadDto.builder()
	// 		.payId(insteadAgreeReq.getPayId())
	// 		.borrowerId(insteadAgreeReq.getBorrowerId())
	// 		.lenderId(insteadAgreeReq.getLenderId())
	// 		.build();
	// }
	//
	// /*
	// 모든 참여자가 동의했는지 확인
	//  */
	// private boolean checkAllParticipantsAgreed(Long payId) {
	// 	Long totalParticipants = participantRepository.getTotalParticipants(payId);
	// 	log.info("payId: {}, 참여자수: {}", payId, totalParticipants);
	// 	// Redis 에서 해당 payId에 대한 모든 참가자의 동의 정보를 조회
	// 	Map<Object, Object> agreeInfo = redisTemplate.opsForHash().entries("payId:" + payId + ":true");
	// 	// Redis 에 저장된 동의한 참가자 수
	// 	int agreedParticipantsCount = agreeInfo.size();
	// 	log.info("동의자 수: {}", agreedParticipantsCount);
	// 	// 모든 참가자가 동의했는지 여부를 확인
	// 	return agreedParticipantsCount == totalParticipants;
	// }

}


