package com.pay.pie.global.common;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"status", "message", "result"})
public class BaseResponse<T> {
	private T reuslt;
	private int status;
	private String message;

	public static <T> ResponseEntity<BaseResponse<T>> success(SuccessCode successCode, T data) {
		return ResponseEntity
			.status(successCode.getStatus())
			.body(new BaseResponse<>(data, successCode.getStatus(), successCode.getMessage()));
	}
}
