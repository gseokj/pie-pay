package com.pay.pie.domain.member.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.member.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByEmail(String email);


	@Query(
		"""
			SELECT m
			from Member m
			Join FETCH m.accountList
			WHERE m.id = :memberId
		"""
	)
	Member findMemberAccount(@Param("memberId") Long memberId);
}
