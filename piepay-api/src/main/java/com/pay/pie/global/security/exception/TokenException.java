package com.pay.pie.global.security.exception;

import java.io.IOException;

import org.springframework.http.MediaType;

import com.nimbusds.jose.shaded.gson.Gson;
import com.pay.pie.global.security.dto.TokenErrorResponse;

import jakarta.servlet.http.HttpServletResponse;

public class TokenException extends RuntimeException {
	public TokenException(String message) {
		super(message);
	}

	protected static void addTokenErrorResponse(HttpServletResponse response, int status, String message) {
		response.setStatus(status);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding("UTF-8");

		TokenErrorResponse errorResponse = TokenErrorResponse.builder()
			.code(status)
			.message(message)
			.build();

		Gson gson = new Gson();
		try {
			response.getWriter().println(gson.toJson(errorResponse));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
