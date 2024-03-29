package com.pay.pie.global.security.user;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import com.pay.pie.domain.member.entity.Member;

import lombok.Getter;

@Getter
public class CustomOauth2User extends DefaultOAuth2User {

	private final Member member;

	public CustomOauth2User(
		Collection<? extends GrantedAuthority> authorities,
		Map<String, Object> attributes,
		String nameAttributeKey,
		Member member
	) {
		super(authorities, attributes, nameAttributeKey);
		this.member = member;
	}
}
