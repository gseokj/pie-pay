package com.pay.pie.domain.participant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.participant.entity.Participant;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long>, ParticipantRepositoryCustom {

	Participant findByMember(Member member);

	@Query("SELECT SUM(p.payAmount) "
		+ "FROM Participant p "
		+ "WHERE p.pay.id = :payId")
	Long sumPayAmountByPayId(@Param("payId") Long payId);
}
