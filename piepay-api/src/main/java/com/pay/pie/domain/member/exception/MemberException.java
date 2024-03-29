package com.pay.pie.domain.member.exception;

import com.pay.pie.global.common.code.ErrorCode;
import com.pay.pie.global.exception.BaseException;

public class MemberException extends BaseException {
	public MemberException(ErrorCode errorCode) {
		super(errorCode);
	}
}
