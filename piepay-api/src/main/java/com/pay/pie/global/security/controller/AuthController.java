package com.pay.pie.global.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;
import com.pay.pie.global.security.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/token")
@RequiredArgsConstructor
public class AuthController {

	private final JwtService jwtService;

	@PostMapping("/refresh")
	public ResponseEntity<BaseResponse<String>> rotateJwtToken(@CookieValue(value = "refreshToken") String refreshToken) {
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);
		log.info(refreshToken);

		return  BaseResponse.success(SuccessCode.CHECK_SUCCESS, "g2g2");
	}
}
