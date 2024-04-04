package com.pay.pie.global.security.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonPropertyOrder({"code", "message", "time"})
public class TokenErrorResponse {

	private int code;
	private String message;
	private String time;

	@Builder
	public TokenErrorResponse(int code, String message) {
		this.code = code;
		this.message = message;
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
		this.time = LocalDateTime.now().format(formatter);
	}
}
