package com.pay.pie.domain.member.exception;

import com.pay.pie.global.common.code.ErrorCode;

import lombok.Getter;

@Getter
public enum MemberExceptionCode implements ErrorCode {

	NOT_FOUND_MEMBER(404, "M001", "존재하지 않는 멤버입니다."),
	MISMATCH_PHONE_CERTIFICATION_NUMBER(400, "M010", "인증번호가 틀립니다."),
	MISMATCH_ACCOUNT_CERTIFICATION_WORD(400, "M011", "입금자명이 틀립니다."),
	MISMATCH_PAYMENT_PASSWORD_CERTIFICATION(400, "M012", "다시 입력해 주세요.");

	// 에러 코드의 '코드 상태'을 반환한다.
	private final int status;

	// 에러 코드의 '코드간 구분 값'을 반환한다.
	private final String divisionCode;

	// 에러 코드의 '코드 메시지'을 반환한다.
	private final String message;

	MemberExceptionCode(int status, String divisionCode, String message) {
		this.status = status;
		this.divisionCode = divisionCode;
		this.message = message;
	}
}
