package com.pay.pie.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Component
public class SmsUtil {

	private final DefaultMessageService service;

	public SmsUtil(
		@Value(value = "${coolSms.api-key}") String apiKey,
		@Value(value = "${coolSms.api-secret-key}") String apiSecretKey) {
		this.service = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, "https://api.coolsms.co.kr");
	}

	public void sendCertificationMessage(String phoneNumber, String certificateNumber) {

		Message message = new Message();
		message.setFrom("01046548530");
		message.setTo(phoneNumber);
		message.setText("인증번호 : " + certificateNumber);

		service.sendOne(new SingleMessageSendingRequest(message));
	}
}
