package com.pay.pie.domain.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.member.entity.Member;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	Optional<Account> findAccountByMemberId(Long memberId);

	List<Account> findAllByMember(Member member);
}
