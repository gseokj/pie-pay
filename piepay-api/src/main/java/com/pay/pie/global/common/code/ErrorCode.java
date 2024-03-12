package com.pay.pie.global.common.code;

import lombok.Getter;

@Getter
public enum ErrorCode {

	/*
	 * ******************************* Global Error CodeList ***************************************
	 * HTTP Status Code
	 * 400 : Bad Request
	 * 401 : Unauthorized
	 * 403 : Forbidden
	 * 404 : Not Found
	 * 409 : Conflict
	 * 500 : Internal Server Error
	 * *********************************************************************************************
	 */

	// 잘못된 서버 요청
	BAD_REQUEST_ERROR(400, "G001", "Bad Request Exception"),

	// @RequestBody 데이터 미 존재
	REQUEST_BODY_MISSING_ERROR(400, "G002", "Required request body is missing"),

	// 유효하지 않은 타입
	INVALID_TYPE_VALUE(400, "G003", "Invalid Type Value"),

	// Request Parameter 로 데이터가 전달되지 않을 경우
	MISSING_REQUEST_PARAMETER_ERROR(400, "G004", "Missing Servlet RequestParameter Exception"),

	// 입력/출력 값이 유효하지 않음
	IO_ERROR(400, "G005", "I/O Exception"),

	// com.google.gson JSON 파싱 실패
	JSON_PARSE_ERROR(400, "G006", "JsonParseException"),

	// com.fasterxml.jackson.core Processing Error
	JACKSON_PROCESS_ERROR(400, "G007", "com.fasterxml.jackson.core Exception"),

	// 권한이 없음
	FORBIDDEN_ERROR(403, "G008", "Forbidden Exception"),

	// 서버로 요청한 리소스가 존재하지 않음
	NOT_FOUND_ERROR(404, "G009", "Not Found Exception"),

	// NULL Point Exception 발생
	NULL_POINT_ERROR(404, "G010", "Null Point Exception"),

	// @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
	NOT_VALID_ERROR(404, "G011", "Handle Validation Exception");

	/*
	 * ******************************* Error Code Constructor ***************************************
	 */

	// 에러 코드의 '코드 상태'을 반환한다.
	private final int status;

	// 에러 코드의 '코드간 구분 값'을 반환한다.
	private final String divisionCode;

	// 에러 코드의 '코드 메시지'을 반환한다.
	private final String message;

	// 생성자 구성
	ErrorCode(final int status, final String divisionCode, final String message) {
		this.status = status;
		this.divisionCode = divisionCode;
		this.message = message;
	}
}
