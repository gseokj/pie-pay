package com.pay.pie.domain.member.service;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.dao.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service // 빈으로 등록
public class MemberService {

	private final MemberRepository memberRepository;
}
