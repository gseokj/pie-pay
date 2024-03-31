package com.pay.pie.domain.member.dao;

import java.util.List;
import java.util.Optional;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.member.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);

	@Query(
			"""
SELECT par.member.id, COUNT(par.pay), SUM(par.payAmount)
FROM Participant par
JOIN par.pay pay
JOIN pay.meet meet
WHERE meet.id = :meetId
GROUP BY par.member.id
"""
	)
	List<Object[]> findPayInfoByMeetId(@Param("meetId") Long meetId);
}
