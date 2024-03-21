package com.pay.pie.global.security.user;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuth2Attribute {

	private String nameAttributeKey;
	private OAuth2UserInfo oauth2UserInfo;

	@Builder
	public OAuth2Attribute(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
		this.nameAttributeKey = nameAttributeKey;
		this.oauth2UserInfo = oauth2UserInfo;
	}

	public static OAuth2Attribute of(String socialType, String userNameAttributeName, Map<String, Object> attributes) {

		return OAuth2Attribute.builder()
			.nameAttributeKey(userNameAttributeName)
			.oauth2UserInfo(OAuth2AttributeFactory.getOauth2UserInfo(socialType, attributes))
			.build();
	}

}