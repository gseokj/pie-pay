package com.pay.pie.domain.member.application;

import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.member.dto.request.PhoneVerificationRequest;
import com.pay.pie.domain.member.dto.request.PhoneVerificationCheckRequest;
import com.pay.pie.domain.member.exception.MemberException;
import com.pay.pie.domain.member.exception.MemberExceptionCode;
import com.pay.pie.global.util.RedisUtil;
import com.pay.pie.global.util.SmsUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberCertificationServiceImpl implements MemberCertificationService {

	private final SmsUtil smsUtil;
	private final RedisUtil redisUtil;

	@Override
	public void sendCertificationNumber(PhoneVerificationRequest phoneVerificationRequest) {

		String memberPhoneNumber = phoneVerificationRequest.phoneNumber();
		String certificationNumber = String.valueOf(createRandomNumber());

		smsUtil.sendCertificationMessage(phoneVerificationRequest.phoneNumber(), String.valueOf(createRandomNumber()));
		redisUtil.setData(memberPhoneNumber, certificationNumber, TimeUnit.MINUTES.toMillis(3)); // 3분
	}

	@Override
	public void checkCertificationNumber(PhoneVerificationCheckRequest phoneVerificationCheckRequest) {

		// 회원 휴대폰 정보 저장 로직

		if (!redisUtil.getData(phoneVerificationCheckRequest.phoneNumber())
			.equals(phoneVerificationCheckRequest.verificationNumber())) {
			throw new MemberException(MemberExceptionCode.MISMATCH_PHONE_CERTIFICATION_NUMBER);
		}
	}

	// 랜덤으로 6자리 생성
	private int createRandomNumber() {
		return (int)(Math.random() * 900000) + 100000;
	}

}
