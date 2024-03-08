package com.pay.pie.global.exception;

import lombok.Getter;

@Getter
public class GlobalException extends RuntimeException {
	private final ErrorCode errorCode;

	public GlobalException(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}

	public GlobalException(ErrorCode errorCode, String message) {
		super(message);
		this.errorCode = errorCode;
	}
}
