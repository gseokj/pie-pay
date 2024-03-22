package com.pay.pie.global.config;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.pay.pie.global.security.filter.JwtAuthenticateFilter;
import com.pay.pie.global.security.handler.OAuth2AuthenticationFailureHandler;
import com.pay.pie.global.security.handler.OAuth2AuthenticationSuccessHandler;
import com.pay.pie.global.security.service.CustomOAuth2UserService;
import com.pay.pie.global.security.service.JwtService;

import lombok.RequiredArgsConstructor;


/*
 *	Spring Security 에서는 인증, 인가 처리를 여러개의 필터를 통해 연쇄적으로 실행
 *	상황에 따라 필터를 골라야 한다.
 *	Config ->  Security 전반적인 관리 및 제어가 가능
 */

@Configuration
@EnableWebSecurity // 스프링 시큐리티 활성화, 웹 보안 설정
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private static final String[] URL_WHITE_LIST = {
		// "/**",
		"/pub/**", "/sub/**", "/pay",
		"/error", "/login/**", "/favicon.ico", "/index/**",
		"/actuator/**", "/actuator", "/api-docs/**", "/swagger-ui/**",
		"/swagger-resources/**", "/swagger-ui.html", "/api/token/**",

	};

	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

	private final JwtService jwtService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource())) // CORS 설정
			.httpBasic(AbstractHttpConfigurer::disable) // httpBasic 사용 X
			.formLogin(AbstractHttpConfigurer::disable) // formLogin 사용 X
			.sessionManagement(session -> session.sessionCreationPolicy(
				SessionCreationPolicy.STATELESS)) // JWT TOKEN 사용함으로 세션 생성, 사용 X
			.csrf(AbstractHttpConfigurer::disable) // rest api 에서 csrf 사용 X
			.authorizeHttpRequests(
				authorize -> authorize.requestMatchers(URL_WHITE_LIST).permitAll().anyRequest().authenticated()
			) // URL_WHITE_LIST에는 누구가 접근 가능(permitAll), WHITE_LIST가 아니면(anyRequest) 인증 (authenticated)
			.oauth2Login(oauth2 -> oauth2
				.userInfoEndpoint(userInfo -> userInfo
					.userService(customOAuth2UserService)) // 사용자 정보 get
				.successHandler(oAuth2AuthenticationSuccessHandler)    // 인증 성공 후 로직 (특정 페이지 redirect)
				.failureHandler(oAuth2AuthenticationFailureHandler)    // 인증 실패 (사용자에게 피드백 제공)
			)
			// UsernamePasswordAuthenticationFilter 필터가 실행 전 jwtAuthenticateFilter() 가 실행
			.addFilterBefore(jwtAuthenticateFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public JwtAuthenticateFilter jwtAuthenticateFilter() {
		return new JwtAuthenticateFilter(jwtService, URL_WHITE_LIST);
	}

	// CORS 설정
	CorsConfigurationSource corsConfigurationSource() {
		final List<String> allowedHeaders = List.of("*");
		final List<String> allowedOriginPatterns = List.of(
			"http://localhost:8080",
			"http://localhost:3000"
		);
		return request -> {
			CorsConfiguration config = new CorsConfiguration();
			config.setAllowedHeaders(allowedHeaders);
			config.setAllowedMethods(Collections.singletonList("*"));
			config.setAllowedOriginPatterns(allowedOriginPatterns); // ⭐️ 허용할 origin
			config.setAllowCredentials(true);
			return config;
		};
	}
}
