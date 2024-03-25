package com.pay.pie.domain.member.dto.verify.request;

public record PhoneVerificationCheckRequest(
	String phoneNumber,
	String verificationNumber
) {
}
