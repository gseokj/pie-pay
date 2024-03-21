package com.pay.pie.global;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import com.pay.pie.global.util.JWTUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class StompHandler implements ChannelInterceptor {

	private final JWTUtil jwtUtil;

	// websocket을 통해 들어온 요청이 처리 되기전 실행됨
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		// websocket 연결시 헤더의 jwt token 유효성 검증
		if (StompCommand.CONNECT == accessor.getCommand()) {
			String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				String token = authorizationHeader.substring(7); // Extract the token excluding "Bearer "
				try {
					jwtUtil.verifyJwtToken(token);
					// Token is valid
					log.info("JWT Token is valid");
				} catch (Exception e) {
					// Token is not valid
					log.error("JWT Token validation failed: {}", e.getMessage());
					throw new RuntimeException("JWT Token validation failed");
				}
			} else {
				// No token provided
				log.error("No JWT Token provided in the Authorization header");
				throw new RuntimeException("No JWT Token provided");
			}
		}
		return message;
	}

}

// @Component
// public class StompHandler implements ChannelInterceptor {
//
// 	private static final Logger LOGGER = LoggerFactory.getLogger(StompHandler.class);
//
// 	@Override
// 	public void postSend(Message message, MessageChannel channel, boolean sent) {
// 		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
// 		String sessionId = accessor.getSessionId();
//
// 		switch ((accessor.getCommand())) {
// 			case CONNECT:
//
// 				// 유저가 Websocket으로 connect()를 한 뒤 호출됨
// 				LOGGER.info("세션 들어옴 => {}", sessionId);
// 				break;
//
// 			case DISCONNECT:
//
// 				// 유저가 Websocket으로 disconnect() 를 한 뒤 호출됨 or 세션이 끊어졌을 때 발생
// 				LOGGER.info("세션 끊음 => {}", sessionId);
// 				break;
//
// 			default:
//
// 				break;
// 		}
//
// 	}
// }
