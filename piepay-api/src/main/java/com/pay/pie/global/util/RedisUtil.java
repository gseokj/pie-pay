package com.pay.pie.global.util;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {

	private final StringRedisTemplate redisTemplate;

	public void setData(String key, String value, Long expiredTime) {
		redisTemplate.opsForValue().set(key, value, expiredTime, TimeUnit.MILLISECONDS);
	}

	public String getData(String key) {
		return redisTemplate.opsForValue().get(key);
	}

}
