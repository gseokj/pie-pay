package com.pay.pie.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.pay.pie.domain.application.dto.AgreeDto;
import com.pay.pie.domain.application.dto.InsteadDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
@EnableRedisRepositories // redis 사용
@RequiredArgsConstructor
public class RedisConfig {


	@Value(value = "${spring.data.redis.host}")
	private String host;

	@Value(value = "${spring.data.redis.port}")
	private int port;

	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		log.info("111111111111111111111111111111111111111111"+host);
		log.info("111111111111111111111111111111111111111111"+port);
		return new LettuceConnectionFactory(host, port);
	}

	@Bean
	public RedisTemplate<String, Object> redisTemplate() {
		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory());

		// 일반적인 key:value의 경우 시리얼라이저(스트림에 쓰기 위해 객체를 직렬화)
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new StringRedisSerializer());

		// Hash를 사용할 경우 시리얼라이저, refreshToken
		redisTemplate.setHashKeySerializer(new StringRedisSerializer());
		redisTemplate.setHashValueSerializer(new StringRedisSerializer());

		// 모든 경우
		// redisTemplate.setDefaultSerializer(new StringRedisSerializer());

		return redisTemplate;
	}

	@Bean
	public RedisTemplate<String, AgreeDto> redisTemplateAgreeData() {
		RedisTemplate<String, AgreeDto> redisTemplateAgreeData = new RedisTemplate<>();
		redisTemplateAgreeData.setConnectionFactory(redisConnectionFactory());

		redisTemplateAgreeData.setKeySerializer(new StringRedisSerializer());        // Key Serializer
		redisTemplateAgreeData.setValueSerializer(
			new Jackson2JsonRedisSerializer<>(String.class));      // Value Serializer

		redisTemplateAgreeData.setHashKeySerializer(new StringRedisSerializer());
		redisTemplateAgreeData.setHashValueSerializer(new StringRedisSerializer());
		
		return redisTemplateAgreeData;
	}

	@Bean
	public RedisTemplate<String, InsteadDto> redisTemplateInsteadData() {
		RedisTemplate<String, InsteadDto> redisTemplateInsteadData = new RedisTemplate<>();
		redisTemplateInsteadData.setConnectionFactory(redisConnectionFactory());

		redisTemplateInsteadData.setKeySerializer(new StringRedisSerializer());        // Key Serializer
		redisTemplateInsteadData.setValueSerializer(
			new Jackson2JsonRedisSerializer<>(String.class));      // Value Serializer

		redisTemplateInsteadData.setHashKeySerializer(new StringRedisSerializer());
		redisTemplateInsteadData.setHashValueSerializer(new StringRedisSerializer());

		return redisTemplateInsteadData;
	}

}

