package com.pay.pie.domain.memberMeet.exception;

import com.pay.pie.global.common.code.ErrorCode;

import lombok.Getter;

@Getter
public enum MemberMeetExceptionCode implements ErrorCode {

	NOT_FOUND_MEET(404, "MM001", "존재하지 않는 모입입니다."),
	REGISTERED_ALREADY(407, "MM002", "이미 가입한 모임입니다.");

	// 에러 코드의 '코드 상태'을 반환한다.
	private final int status;

	// 에러 코드의 '코드간 구분 값'을 반환한다.
	private final String divisionCode;

	// 에러 코드의 '코드 메시지'을 반환한다.
	private final String message;

	MemberMeetExceptionCode(int status, String divisionCode, String message) {
		this.status = status;
		this.divisionCode = divisionCode;
		this.message = message;
	}
}
