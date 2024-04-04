package com.pay.pie.domain.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.global.security.dto.SecurityUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PasswordVerificationService {

	private final MemberRepository memberRepository;

	public boolean verifyPassword(SecurityUserDto securityUserDto, String inputPassword) {
		Member member = memberRepository.findById(securityUserDto.getMemberId()).orElseThrow(
			() -> new IllegalArgumentException("해당 회원이 없음")
		);
		log.info("inputPassword: {}", inputPassword);
		log.info("DBPassword: {}", member.getPayPassword());
		return inputPassword.equals(member.getPayPassword());
	}
}
