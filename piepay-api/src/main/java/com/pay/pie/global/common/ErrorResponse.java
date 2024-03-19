package com.pay.pie.global.common;

import java.util.List;
import java.util.Objects;

import org.springframework.validation.FieldError;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.pay.pie.global.common.code.ErrorCode;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonPropertyOrder({"status", "code", "message", "reason", "errors"})
public class ErrorResponse {

	private int status;
	private String code;
	private String message;
	private String reason;
	private List<FieldError> errors;

	@Builder(builderMethodName = "of")
	protected ErrorResponse(final ErrorCode code, final List<FieldError> errors, final String message) {
		Objects.requireNonNull(code);
		this.status = code.getStatus();
		this.code = code.getDivisionCode();
		this.message = code.getMessage();
		this.errors = Objects.isNull(errors) ? List.of() : errors;
		this.reason = Objects.isNull(message) ? "" : message;
	}
}
