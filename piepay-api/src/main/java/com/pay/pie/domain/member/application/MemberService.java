package com.pay.pie.domain.member.application;

import java.util.Optional;

import com.pay.pie.domain.member.dto.UpdateMemberRequest;
import com.pay.pie.domain.member.dto.response.AccountResponse;
import com.pay.pie.domain.member.dto.response.MemberDetailResponse;
import com.pay.pie.domain.member.entity.Member;

public interface MemberService {

	Member save(Member member);

	MemberDetailResponse getMemberDetail(Long memberId);

	MemberDetailResponse updateMemberDetail(Long memberId, UpdateMemberRequest request);

	Optional<Member> findMemberByEmail(String email);

	Member findMemberById(Long id);


}
