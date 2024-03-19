package com.pay.pie.domain.member.dto.request;

public record PhoneVerificationCheckRequest(
	String phoneNumber,
	String verificationNumber
) {
}
