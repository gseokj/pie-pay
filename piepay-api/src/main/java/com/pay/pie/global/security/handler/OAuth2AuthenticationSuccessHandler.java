package com.pay.pie.global.security.handler;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.entity.MemberRole;
import com.pay.pie.global.security.user.CustomOauth2User;
import com.pay.pie.global.util.JWTUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JWTUtil jwtUtil;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		Member member = ((CustomOauth2User)authentication.getPrincipal()).getMember();
		String email = member.getEmail();
		String role = member.getMemberRole().getValue();

		String accessToken = jwtUtil.generateAccessToken(email, role);
		String refreshToken = jwtUtil.generateRefreshToken(email, role);

		// 인증 절차가 끝난 회원
		// 회원이 존재하면 jwt token 발행을 시작한다.
		if (role.equals(MemberRole.ROLE_CERTIFIED_MEMBER.getValue())) {

			// accessToken을 쿼리스트링에 담는 url을 만들어준다.
			String redirectURI = UriComponentsBuilder.fromUriString("http://localhost:3000/success")
				.queryParam("accessToken", accessToken)
				.queryParam("refresh-token", refreshToken)
				.build()
				.encode(StandardCharsets.UTF_8)
				.toUriString();
			log.info("redirect 준비");
			// 로그인 확인 페이지로 리다이렉트 시킨다.
			getRedirectStrategy().sendRedirect(request, response, redirectURI);

		} else {
			// 인증 절차가 끝나지 않은 회원
			String redirectURI = UriComponentsBuilder.fromUriString("http://localhost:3000/auth")
				.queryParam("accessToken", accessToken)
				.queryParam("refresh-token", refreshToken)
				.build()
				.encode(StandardCharsets.UTF_8)
				.toUriString();
			// 회원가입 페이지로 리다이렉트 시킨다.
			getRedirectStrategy().sendRedirect(request, response, redirectURI);
		}
	}
}
