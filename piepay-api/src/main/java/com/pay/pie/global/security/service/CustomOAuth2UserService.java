package com.pay.pie.global.security.service;

import java.util.Collections;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.application.MemberService;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.entity.MemberRole;
import com.pay.pie.global.security.user.CustomOauth2User;
import com.pay.pie.global.security.user.OAuth2Attribute;
import com.pay.pie.global.security.user.OAuth2UserInfo;
import com.pay.pie.global.util.bank.BankUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final MemberService memberService;
	private final BankUtil bankUtil;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
		String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId();
		String userNameAttributeName = loadUserNameAttributeName(oAuth2UserRequest); //id

		OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(
			registrationId,
			userNameAttributeName,
			oAuth2User.getAttributes()
		);

		OAuth2UserInfo oAuth2UserInfo = oAuth2Attribute.getOauth2UserInfo();
		String email = oAuth2UserInfo.getEmail();
		Member findMember = memberService.findMemberByEmail(email).orElseGet(() -> joinMember(oAuth2UserInfo));

		return new CustomOauth2User(
			Collections.singleton(new SimpleGrantedAuthority(findMember.getMemberRole().getValue())),
			oAuth2User.getAttributes(),
			userNameAttributeName,
			findMember
		);
	}

	public String loadUserNameAttributeName(OAuth2UserRequest oAuth2UserRequest) {
		return oAuth2UserRequest
			.getClientRegistration()
			.getProviderDetails()
			.getUserInfoEndpoint()
			.getUserNameAttributeName();
	}

	Member joinMember(OAuth2UserInfo oAuth2UserInfo) {

		String newMemberEmail = oAuth2UserInfo.getEmail();
		String userApiKey = bankUtil.createUser(newMemberEmail);

		return memberService.save(Member.of()
			.email(newMemberEmail)
			.nickname(oAuth2UserInfo.getNickname())
			.profileImage(oAuth2UserInfo.getProfileImage())
			.memberRole(MemberRole.ROLE_NOT_CERTIFIED_MEMBER)
			.apiKey(userApiKey)
			.build());
	}

}




