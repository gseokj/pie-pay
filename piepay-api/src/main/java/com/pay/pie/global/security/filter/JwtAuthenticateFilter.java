package com.pay.pie.global.security.filter;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.PatternMatchUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pay.pie.global.security.exception.AccessTokenException;
import com.pay.pie.global.security.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticateFilter extends OncePerRequestFilter {

	private final JwtService jwtService;

	private final String[] URL_WHITE_LIST;

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
		@NonNull FilterChain filterChain) throws ServletException, IOException {

		String atc = request.getHeader("Authorization");

		if (!StringUtils.hasText(atc)) {
			doFilter(request, response, filterChain);
			return;
		}
		// WHITE LIST의 패스에 대한 JWT 토큰 검증 패스

		if (PatternMatchUtils.simpleMatch(URL_WHITE_LIST, request.getRequestURI())) {
			filterChain.doFilter(request, response);
			return;
		}

		try {
			log.info("requestURI :{} ", request.getRequestURI());
			log.info(request.getRequestURI());
			Authentication authentication = jwtService.authenticationAccessToken(request);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			filterChain.doFilter(request, response);
		} catch (AccessTokenException accessTokenException) {
			accessTokenException.addResponseError(response);
		}
	}
}
