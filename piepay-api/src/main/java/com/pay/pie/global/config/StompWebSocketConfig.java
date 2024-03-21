package com.pay.pie.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker //웹 소켓 메시지를 다룰 수 있게 허용
public class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {

	/*
	 * 보낼때와 받을 때 prefix 지정
	 */
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		//발행자가 "/topic"의 경로로 메시지를 주면 구독자들에게 전달
		// "/topic" 경로가 붙은 경우 messageBroker가 잡아서 해당 채팅방에 구독하고 있는 클라이언트에게 메시지 전달
		registry.enableSimpleBroker("/sub");
		// 발행자가 "/app"의 경로로 메시지를 주면 가공을 해서 구독자들에게 전달
		// 클라이언트가 메시지를 발행할 때, 브로커의 목적지에 접두사를 정의하는 것
		// 클라이언트가 메시지를 보낼 때 경로 맨 앞에 "/app" 붙어있으면 Broker로 보내짐
		registry.setApplicationDestinationPrefixes("/pub");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// web socket 통신 url
		log.info("SOCKET 연결!");
		registry.addEndpoint("/stomp-pay")
			.setAllowedOriginPatterns("*");
		// .withSockJS(); // 커넥션을 맺는 경로 설정. 만약 WebSocket을 사용할 수 없는 브라우저라면 다른 방식을 사용하도록 설정
	}

}