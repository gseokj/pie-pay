package com.pay.pie.domain.member.application;

import com.pay.pie.domain.member.dto.request.PhoneVerificationRequest;
import com.pay.pie.domain.member.dto.request.PhoneVerificationCheckRequest;
import com.pay.pie.global.security.dto.SecurityUserDto;

public interface MemberCertificationService {

	void sendCertificationNumber(PhoneVerificationRequest phoneVerificationRequest);

	void checkCertificationNumber(
		PhoneVerificationCheckRequest phoneVerificationCheckRequest,
		SecurityUserDto securityUserDto
	);
}
