package com.pay.pie.global.exception;

import com.pay.pie.global.common.code.ErrorCode;

import lombok.Getter;

@Getter
public class BaseException extends RuntimeException {
	private final ErrorCode errorCode;

	public BaseException(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}

	public BaseException(ErrorCode errorCode, String message) {
		super(message);
		this.errorCode = errorCode;
	}
}
