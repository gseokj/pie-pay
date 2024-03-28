package com.pay.pie.global.security.filter;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.nimbusds.jose.shaded.gson.Gson;
import com.pay.pie.global.common.ErrorResponse;
import com.pay.pie.global.common.code.GlobalErrorCode;
import com.pay.pie.global.security.service.JwtService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
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
		// WHITE LIST의 패스에 대한 JWT 토큰 검증 패스
		if (PatternMatchUtils.simpleMatch(URL_WHITE_LIST, request.getRequestURI())) {
			filterChain.doFilter(request, response);
			return;
		}

		try {
			log.trace("유저의 토큰을 검증합니다.");
			Authentication authentication = jwtService.authenticationAccessToken(request);
			log.trace("유저의 토큰이 검증되었습니다. 유저를 SecurityContextHolder에 저장합니다.");
			SecurityContextHolder.getContext().setAuthentication(authentication);
			filterChain.doFilter(request, response);
		} catch (ExpiredJwtException e) {
			log.trace("유저의 액세스 토큰이 만료되었습니다.");
			sendJwtErrorResponse(GlobalErrorCode.EXPIRED_ACCESS_TOKEN_EXCEPTION, response);
		} catch (MalformedJwtException | SignatureException | UnsupportedJwtException e) {
			log.trace("유저의 액세스 토큰이 타당하지 않습니다.");
			sendJwtErrorResponse(GlobalErrorCode.INVALID_ACCESS_TOKEN_EXCEPTION, response);
		} catch (IllegalArgumentException e) {
			log.trace("유저의 액세스 토큰이 존재하지 않습니다.");
			sendJwtErrorResponse(GlobalErrorCode.ILLEGAL_TOKEN_EXCEPTION, response);
		}
	}

	public void sendJwtErrorResponse(GlobalErrorCode errorCode, HttpServletResponse response) throws IOException {
		Gson gson = new Gson();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.setStatus(errorCode.getStatus());
		gson.toJson(ErrorResponse.of().code(errorCode).build(), response.getWriter());
	}
}
