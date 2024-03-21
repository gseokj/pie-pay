package com.pay.pie.domain.participant.dao;

import static com.pay.pie.domain.participant.entity.QParticipant.*;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ParticipantRepositoryImpl implements ParticipantRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public Long getTotalParticipants(Long payId) {
		return (long)queryFactory
			.selectFrom(participant)
			.where(participant.pay.id.eq(payId))
			.fetch()
			.size();
	}

	// @Override
	// public boolean existsParticipantByIdAndPayId(Long participantId, Long payId) {
	// 	return queryFactory
	// 		.selectOne()
	// 		.from(participant)
	// 		.where(participant.id.eq(participantId).and(participant.pay.id.eq(payId)))
	// 		.fetchFirst() != null;
	// }

}
