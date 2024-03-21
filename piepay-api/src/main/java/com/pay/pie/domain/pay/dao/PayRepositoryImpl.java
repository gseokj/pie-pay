package com.pay.pie.domain.pay.dao;

import static com.pay.pie.domain.participant.entity.QParticipant.*;

import java.util.List;

import com.pay.pie.domain.participant.entity.Participant;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PayRepositoryImpl implements PayRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Participant> findParticipantsByPayId(Long payId) {
		return queryFactory
			.selectFrom(participant)
			.where(participant.pay.id.eq(payId))
			.fetch();

	}

}
