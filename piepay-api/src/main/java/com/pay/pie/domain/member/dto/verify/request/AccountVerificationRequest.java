package com.pay.pie.domain.member.dto.verify.request;

public record AccountVerificationRequest(
	String bankCode,
	String accountNo

) {
}
