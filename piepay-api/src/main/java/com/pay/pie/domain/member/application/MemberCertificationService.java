package com.pay.pie.domain.member.application;

import com.pay.pie.domain.member.dto.verify.request.AccountVerificationCheckRequest;
import com.pay.pie.domain.member.dto.verify.request.AccountVerificationRequest;
import com.pay.pie.domain.member.dto.verify.request.PaymentPasswordRequest;
import com.pay.pie.domain.member.dto.verify.request.PhoneVerificationCheckRequest;
import com.pay.pie.domain.member.dto.verify.request.PhoneVerificationRequest;
import com.pay.pie.global.security.dto.SecurityUserDto;
import com.pay.pie.global.security.dto.TokenDto;

public interface MemberCertificationService {

	void sendCertificationNumber(PhoneVerificationRequest phoneVerificationRequest);

	void checkCertificationNumber(
		PhoneVerificationCheckRequest phoneVerificationCheckRequest,
		SecurityUserDto securityUserDto
	);

	void sendAccountCertificationNumber(
		AccountVerificationRequest accountVerificationRequest,
		SecurityUserDto securityUserDto
	);

	void checkCertificationWord(
		AccountVerificationCheckRequest accountVerificationCheckRequest,
		SecurityUserDto securityUserDto
	);

	void setPaymentPassword(
		PaymentPasswordRequest paymentPasswordRequest,
		SecurityUserDto securityUserDto
	);

	TokenDto reEnterPaymentPassword(
		PaymentPasswordRequest paymentPasswordRequest,
		SecurityUserDto securityUserDto
	);
}
