package com.pay.pie.global.util;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {

	// salt
	private final SecretKey secretKey;
	// accessToken 만료시간
	private final long accessTokenExpireTime;
	// refreshToken 만료시간
	private final long refreshTokenExpireTime;
	// 서비스 발급 주체
	private final String issuer;

	public JWTUtil(
		@Value(value = "${jwt.key.salt}")
		String secretKey,
		@Value(value = "${jwt.expire_time.access-token}")
		long accessTokenExpireTime,
		@Value(value = "${jwt.expire_time.refresh-token}")
		long refreshTokenExpireTime,
		@Value(value = "${jwt.issuer}")
		String issuer
	) {
		this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
		this.accessTokenExpireTime = accessTokenExpireTime;
		this.refreshTokenExpireTime = refreshTokenExpireTime;
		this.issuer = issuer;
	}

	public String generateAccessToken(String email, String role) {
		return generateToken(email, role, accessTokenExpireTime);
	}

	public String generateRefreshToken(String email, String role) {
		String refreshToken = generateToken(email, role, refreshTokenExpireTime);
		// refresh token 발급시 redis에 저장
		// tokenRedisDao.save(userSecurityDTO.getId(), refreshToken, refreshTokenExpireTime);
		return refreshToken;
	}

	private String generateToken(String email, String role, long expireTime) {
		Date expireDate = new Date(new Date().getTime() + expireTime);

		return Jwts.builder()
			.issuer(issuer)
			.expiration(expireDate)
			.subject(email)
			.claim("roles", role)
			.signWith(secretKey)
			.compact();
	}

	// public boolean isMatching(UUID id, String refreshToken) throws RefreshTokenException {
	// 	return tokenRedisDao.isMatching(id, refreshToken);
	// }

	public Claims verifyJwtToken(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload();
	}
}
