package com.pay.pie.domain.participant.dao;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ParticipantRepositoryImpl implements ParticipantRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	// @Override
	// public boolean existsParticipantByIdAndPayId(Long participantId, Long payId) {
	// 	return queryFactory
	// 		.selectOne()
	// 		.from(participant)
	// 		.where(participant.id.eq(participantId).and(participant.pay.id.eq(payId)))
	// 		.fetchFirst() != null;
	// }

}
