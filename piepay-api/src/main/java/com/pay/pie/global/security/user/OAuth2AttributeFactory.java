package com.pay.pie.global.security.user;

import java.util.Map;

public class OAuth2AttributeFactory {

	public static OAuth2UserInfo getOauth2UserInfo(String socialType, Map<String, Object> attributes) {
		return switch (socialType) {
			case "kakao" -> new KakaoUserInfo(attributes);
			default -> throw new IllegalArgumentException("유효하지 않은 소셜 플랫폼입니다.");
		};
	}

}
