package com.pay.pie.domain.account.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.member.entity.Member;

public interface AccountRepository extends JpaRepository<Account, Long> {

	Optional<Account> findAccountByMember(Member member);

}
