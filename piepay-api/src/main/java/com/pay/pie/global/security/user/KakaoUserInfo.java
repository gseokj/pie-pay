package com.pay.pie.global.security.user;

import java.util.Map;

public class KakaoUserInfo extends OAuth2UserInfo {

	private Map<String, Object> userInfo;
	private Map<String, Object> profile;

	public KakaoUserInfo(Map<String, Object> attributes) {
		super(attributes);
		userInfo = (Map<String, Object>)attributes.get("kakao_account");
		profile = (Map<String, Object>)userInfo.get("profile");
	}

	@Override
	public String getEmail() {
		return String.valueOf(userInfo.get("email"));
	}

	@Override
	public String getNickname() {
		return String.valueOf(profile.get("nickname"));
	}

	@Override
	public String getProfileImage() {
		return String.valueOf(profile.get("profile_image_url"));
	}
}
