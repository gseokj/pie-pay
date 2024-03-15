package com.pay.pie.global.security.handler;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

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

		// OAuth2User로 캐스팅하여 인증된 사용자 정보를 가져온다.
		OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
		// 사용자 이메일을 가져온다.
		String email = oAuth2User.getAttribute("email");
		// 서비스 제공 플랫폼(GOOGLE, KAKAO, NAVER)이 어디인지 가져온다.
		String provider = oAuth2User.getAttribute("provider");

		// CustomOAuth2UserService에서 셋팅한 로그인한 회원 존재 여부를 가져온다.
		boolean isExist = oAuth2User.getAttribute("exist");
		// OAuth2User로 부터 Role을 얻어온다.
		String role = oAuth2User.getAuthorities().stream().
			findFirst() // 첫번째 Role을 찾아온다.
			.orElseThrow(IllegalAccessError::new) // 존재하지 않을 시 예외를 던진다.
			.getAuthority(); // Role을 가져온다.

		// 인증 절차가 끝난 회원
		if (isExist) {
			// 회원이 존재하면 jwt token 발행을 시작한다.
			String accessToken = jwtUtil.generateAccessToken(email, role);
			String refreshToken = jwtUtil.generateRefreshToken(email, role);

			// accessToken을 쿼리스트링에 담는 url을 만들어준다.
			String redirectURI = UriComponentsBuilder.fromUriString("메인 페이지")
				.queryParam("accessToken", accessToken)
				.queryParam("refresh-token", refreshToken)
				.build()
				.encode(StandardCharsets.UTF_8)
				.toUriString();
			log.info("redirect 준비");
			// 로그인 확인 페이지로 리다이렉트 시킨다.
			getRedirectStrategy().sendRedirect(request, response, redirectURI);

		} else {
			log.info("gd");
			// 인증 절차가 끝나지 않은 회원 MN,,,,,,,,,,,
			String redirectURI = UriComponentsBuilder.fromUriString("http://localhost:3000/auth")
				.queryParam("email", (String)oAuth2User.getAttribute("email"))
				.queryParam("provider", provider)
				.build()
				.encode(StandardCharsets.UTF_8)
				.toUriString();
			// 회원가입 페이지로 리다이렉트 시킨다.
			getRedirectStrategy().sendRedirect(request, response, redirectURI);
		}
	}
}
