package com.pay.pie.global.security.user;

import java.util.HashMap;
import java.util.Map;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Builder(access = AccessLevel.PRIVATE) // Builder 메서드를 외부에서 사용하지 않으므로, Private 제어자로 지정
@Getter
public class OAuth2Attribute {
	private Map<String, Object> attributes; // 사용자 속성 정보를 담는 Map
	private String attributeKey; // 사용자 속성의 키 값
	private String email; // 이메일 정보
	private String name; // 이름 정보
	private String picture; // 프로필 사진 정보
	private String provider; // 제공자 정보

	// 서비스에 따라 OAuth2Attribute 객체를 생성하는 메서드
	public static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes) {
		switch (provider) {
			case "kakao":
				return ofKakao(provider, "email", attributes);
			// case "naver":
			// 	return ofNaver(provider, "id", attributes);
			default:
				throw new RuntimeException();
		}
	}

	/*
	 *   Kakao 로그인일 경우 사용하는 메서드, 필요한 사용자 정보가 kakaoAccount -> kakaoProfile 두번 감싸져 있어서,
	 *   두번 get() 메서드를 이용해 사용자 정보를 담고있는 Map을 꺼내야한다.
	 * */
	private static OAuth2Attribute ofKakao(String provider, String attributeKey,
		Map<String, Object> attributes) {
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
		Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

		return OAuth2Attribute.builder()
			.email((String)kakaoAccount.get("email"))
			.provider(provider)
			.attributes(kakaoProfile)
			.attributeKey(attributeKey)
			.build();
	}

	/*
	 *  Naver 로그인일 경우 사용하는 메서드, 필요한 사용자 정보가 response Map에 감싸져 있어서,
	 *  한번 get() 메서드를 이용해 사용자 정보를 담고있는 Map을 꺼내야한다.
	 * */
	// private static OAuth2Attribute ofNaver(String provider, String attributeKey,
	// 	Map<String, Object> attributes) {
	// 	Map<String, Object> response = (Map<String, Object>)attributes.get("response");
	//
	// 	return OAuth2Attribute.builder()
	// 		.email((String)response.get("email"))
	// 		.attributes(response)
	// 		.provider(provider)
	// 		.attributeKey(attributeKey)
	// 		.build();
	// }

	// OAuth2User 객체에 넣어주기 위해서 Map으로 값들을 반환해준다.
	public Map<String, Object> convertToMap() {
		Map<String, Object> map = new HashMap<>();
		map.put("id", attributeKey);
		map.put("key", attributeKey);
		map.put("email", email);
		map.put("provider", provider);

		return map;
	}
}