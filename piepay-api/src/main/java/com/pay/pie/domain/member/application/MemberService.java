package com.pay.pie.domain.member.application;

import java.util.Optional;

import com.pay.pie.domain.member.entity.Member;

public interface MemberService {

	Member save(Member member);

	Optional<Member> findByEmail(String email);

}
