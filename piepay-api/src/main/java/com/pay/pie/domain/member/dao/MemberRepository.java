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
  			SELECT m
  			FROM Member m
  			JOIN FETCH m.memberMeetList ml
  			WHERE ml.meet.id = :meetId
		"""
	)
	List<Member> findMember(@Param("meetId")Long meetId);
}
