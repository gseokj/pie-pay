package com.pay.pie.domain.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.member.entity.Member;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	@Query(
		"""
  			SELECT a
  			FROM Account a
  			JOIN FETCH Member m
  			WHERE m.id = :memberId
		"""
	)
	List<Account> findAccountByMemberId(Long memberId);

	List<Account> findAllByMember(Member member);
}
