package com.pay.pie.global.util;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.Claims;

public class JwtClaimParser {
	public static Collection<GrantedAuthority> getMemberAuthorities(Claims claims) {
		Object stringAuthorities = claims.get("roles");
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		if (stringAuthorities instanceof Collection<?>) {
			for (Object grantedAuthority : (Collection<?>)stringAuthorities) {
				if (grantedAuthority instanceof String) {
					authorities.add(new SimpleGrantedAuthority("ROLE_" + grantedAuthority));
				}
			}
		}
		return authorities;
	}
}
