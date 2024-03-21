package com.pay.pie.global.security.user;

import java.util.Map;

public abstract class OAuth2UserInfo {
	protected Map<String, Object> attributes;   // 각 소셜에서 전달된 전체 정보

	public OAuth2UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public String getEmail() {
		return null;
	}

	public String getNickname() {
		return null;
	}

	public String getProfileImage() {
		return null;
	}

}
