package com.pay.pie.domain.memberMeet.exception;

import com.pay.pie.global.common.code.ErrorCode;
import com.pay.pie.global.exception.BaseException;

public class MemberMeetException extends BaseException {

	public MemberMeetException(ErrorCode errorCode) {
		super(errorCode);
	}
}
