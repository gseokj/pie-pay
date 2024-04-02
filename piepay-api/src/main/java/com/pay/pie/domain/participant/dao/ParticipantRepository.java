package com.pay.pie.domain.participant.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.participant.dto.ParticipantStatistics;
import com.pay.pie.domain.participant.entity.Participant;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long>, ParticipantRepositoryCustom {

	Participant findByMember(Member member);

	@Query("SELECT SUM(p.payAmount) "
		+ "FROM Participant p "
		+ "WHERE p.pay.id = :payId")
	Long sumPayAmountByPayId(@Param("payId") Long payId);

	// 참여 횟수와 총 사용 금액 통계
	@Query(
		"""
					SELECT new com.pay.pie.domain.participant.dto.
					ParticipantStatistics(pa.member.id,  COUNT(pa.id) , SUM(pa.payAmount))
					FROM Participant pa
					JOIN pa.pay p 
					WHERE pa.member in :members AND p.meet.id = :meetId
					Group BY pa.member
			"""
	)
	List<ParticipantStatistics> getParticipantStatics(
		@Param("members") List<Member> members,
		@Param("meetId") Long meetId
	);

	List<Participant> getAllByMemberIdOrderByUpdatedAtDesc(Long memberId);

}
