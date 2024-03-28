package com.pay.pie.domain.participant.dao;

import static com.pay.pie.domain.participant.entity.QParticipant.*;

import java.util.List;

import com.pay.pie.domain.participant.entity.Participant;
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

	@Override
	public List<Participant> findByPayId(Long payId) {
		return queryFactory
			.selectFrom(participant)
			.where(participant.pay.id.eq(payId))
			.fetch();
	}

	@Override
	public Participant findByMemberIdAndPayId(Long memberId, Long payId) {
		return queryFactory
			.selectFrom(participant)
			.where(
				participant.member.id.eq(memberId)
					.and(participant.pay.id.eq(payId))
			)
			.fetchOne();
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
