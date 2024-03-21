package com.pay.pie.global.security.service;

import java.util.List;
import java.util.Objects;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.global.security.dto.SecurityUserDto;
import com.pay.pie.global.util.JWTUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

	private static final String ACCESS_HEADER_AUTHORIZATION = "Authorization";
	private static final String TOKEN_PREFIX = "Bearer";

	private final JWTUtil jwtUtil;
	private final MemberRepository memberRepository;

	/**
	 * 로그인을 요청한 유저의 Request에서 토큰 정보를 가져오고, 권한을 부여한다.
	 *
	 * @param request 로그인한 유저의 Request
	 * @return Access Token에 있던 유저 정보를 기반으로 한 인증 객체
	 */

	public Authentication authenticationAccessToken(HttpServletRequest request) {
		String token = requestHeaderJwtParser(request);

		Claims claims = verifyJwtToken(token);
		Member findMember = memberRepository.findByEmail(claims.getSubject()).orElseThrow(IllegalAccessError::new);

		SecurityUserDto securityUserDto = SecurityUserDto.builder()
			.memberId(findMember.getId())
			.nickname(findMember.getNickname())
			.email(findMember.getEmail())
			.role(findMember.getMemberRole().getValue())
			.build();

		return new UsernamePasswordAuthenticationToken(securityUserDto, "",
			List.of(new SimpleGrantedAuthority(securityUserDto.getRole()))
		);
	}

	/**
	 * 로그인을 요청한 유저의 Request Header에서 Access Token 정보를 가져온다.
	 *
	 * @param request 유저의 Request
	 * @return Request Header에서 가져온  Access Token 정보
	 */
	public String requestHeaderJwtParser(HttpServletRequest request) {
		String token = request.getHeader(ACCESS_HEADER_AUTHORIZATION);

		// access token is null
		if (Objects.isNull(token)) {
			// TODO: 에러 처리 확인
			return null;
		}
		String[] seperatedToken = token.split(" ");
		if (seperatedToken.length != 2) {
			//TODO: 에러 변경
			throw new RuntimeException("에러 삐비빗");
		}
		// access token is not bearer type
		if (!seperatedToken[0].equalsIgnoreCase(TOKEN_PREFIX)) {
			//TODO: 에러 변경
			throw new RuntimeException("에러 삐비빗");
		}
		return seperatedToken[1];
	}

	// public String createAccessToken(UserSecurityDto userSecurityDto) {
	// 	return jwtUtil.generateAccessToken(userSecurityDto);
	// }

	// public String createRefreshToken(UserSecurityDto userSecurityDto) {
	// 	return jwtUtil.generateRefreshToken(userSecurityDto);
	// }

	public Claims verifyJwtToken(String token) {
		try {
			return jwtUtil.verifyJwtToken(token);
		} catch (MalformedJwtException malformedJwtException) {
			//TODO: 에러 변경
			throw new RuntimeException("에러 삐비빗");
		} catch (SignatureException signatureException) {
			//TODO: 에러 변경
			throw new RuntimeException("에러 삐비빗");
		} catch (UnsupportedJwtException unsupportedJwtException) {
			//TODO: 에러 변경
			throw new RuntimeException("에러 삐비빗");
		} catch (ExpiredJwtException expiredJwtException) {
			//TODO: 에러 변경
			throw new RuntimeException("에러 삐비빗");
		}
	}
}
