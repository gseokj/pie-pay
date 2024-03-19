package com.pay.pie.global;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
public class StompHandler implements ChannelInterceptor {

	private static final Logger LOGGER = LoggerFactory.getLogger(StompHandler.class);

	@Override
	public void postSend(Message message, MessageChannel channel, boolean sent) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		String sessionId = accessor.getSessionId();

		switch ((accessor.getCommand())) {
			case CONNECT:

				// 유저가 Websocket으로 connect()를 한 뒤 호출됨
				LOGGER.info("세션 들어옴 => {}", sessionId);
				break;

			case DISCONNECT:

				// 유저가 Websocket으로 disconnect() 를 한 뒤 호출됨 or 세션이 끊어졌을 때 발생
				LOGGER.info("세션 끊음 => {}", sessionId);
				break;

			default:

				break;
		}

	}
}
