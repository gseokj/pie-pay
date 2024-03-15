package com.pay.pie.global.security.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.global.security.user.OAuth2Attribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	@Override
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

		// 클라이언트 등록 ID(NAVER, KAKAO)
		String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId();
		// 요녀석은 뭐징???
		String userNameAttributeName = loadUserNameAttributeName(oAuth2UserRequest);
		log.info(userNameAttributeName);

		// OAuth2UserService를 사용하여 가져온 OAuth2User 정보로 OAuth2Attribute 객체를 만든다.
		OAuth2Attribute oAuth2Attribute =
			OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

		// OAuth2Attribute의 속성값들을 Map으로 반환 받는다.
		Map<String, Object> memberAttribute = oAuth2Attribute.convertToMap();

		String email = (String)memberAttribute.get("email");
		// Optional<Member> findMember = memberRepository.findByEmail(email);
		Member findMember = new Member();

		if (findMember != null) {
			// 회원이 존재하지 않을경우, memberAttribute의 exist 값을 false로 넣어준다.
			memberAttribute.put("exist", false);
			// 회원의 권한(회원이 존재하지 않으므로 기본권한인 ROLE_USER를 넣어준다), 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환한다.
			return new DefaultOAuth2User(
				Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
				memberAttribute, "email");
		}

		// 회원이 존재할경우, memberAttribute의 exist 값을 true로 넣어준다.
		memberAttribute.put("exist", true);
		// 회원의 권한과, 회원속성, 속성이름을 이용해 DefaultOAuth2User 객체를 생성해 반환한다.
		return new DefaultOAuth2User(
			//TODO: getUserRole() logic 수정`
			Collections.singleton(new SimpleGrantedAuthority("ROLE_".concat("수정"))),
			memberAttribute, "email");
	}

	public String loadUserNameAttributeName(OAuth2UserRequest oAuth2UserRequest) {
		return oAuth2UserRequest
			.getClientRegistration()
			.getProviderDetails()
			.getUserInfoEndpoint()
			.getUserNameAttributeName();
	}
}



