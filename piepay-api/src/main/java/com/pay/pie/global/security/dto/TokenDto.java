package com.pay.pie.global.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenDto {

	String accessToken;
	String refreshToken;

}
