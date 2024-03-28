package com.pay.pie.domain.member.dto.verify.request;

public record AccountVerificationCheckRequest(
	String bankCode,
	String accountNo,
	String verificationWord
) {
}
