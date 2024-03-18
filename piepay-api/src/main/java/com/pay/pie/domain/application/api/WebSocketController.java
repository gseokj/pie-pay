package com.pay.pie.domain.application.api;

import org.springframework.stereotype.Controller;

import com.pay.pie.domain.pay.application.PayParticipantService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

	private PayParticipantService payParticipantService;
}
