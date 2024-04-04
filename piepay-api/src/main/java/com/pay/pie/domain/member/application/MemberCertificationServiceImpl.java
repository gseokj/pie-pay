package com.pay.pie.domain.member.application;

import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.account.entity.Account;
import com.pay.pie.domain.account.repository.AccountRepository;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.member.dto.verify.request.AccountVerificationCheckRequest;
import com.pay.pie.domain.member.dto.verify.request.AccountVerificationRequest;
import com.pay.pie.domain.member.dto.verify.request.PaymentPasswordRequest;
import com.pay.pie.domain.member.dto.verify.request.PhoneVerificationCheckRequest;
import com.pay.pie.domain.member.dto.verify.request.PhoneVerificationRequest;
import com.pay.pie.domain.member.entity.Member;
import com.pay.pie.domain.member.exception.MemberException;
import com.pay.pie.domain.member.exception.MemberExceptionCode;
import com.pay.pie.global.security.dto.SecurityUserDto;
import com.pay.pie.global.security.dto.TokenDto;
import com.pay.pie.global.util.JWTUtil;
import com.pay.pie.global.util.RedisUtil;
import com.pay.pie.global.util.SmsUtil;
import com.pay.pie.global.util.bank.BankUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberCertificationServiceImpl implements MemberCertificationService {

	private final SmsUtil smsUtil;
	private final RedisUtil redisUtil;
	private final BankUtil bankUtil;
	private final JWTUtil jwtUtil;
	private final MemberRepository memberRepository;
	private final AccountRepository accountRepository;

	@Override
	public void sendCertificationNumber(PhoneVerificationRequest phoneVerificationRequest) {

		String memberPhoneNumber = phoneVerificationRequest.phoneNumber();
		String certificationNumber = String.valueOf(createRandomNumber());

		smsUtil.sendCertificationMessage(phoneVerificationRequest.phoneNumber(), certificationNumber);
		redisUtil.setData(memberPhoneNumber, certificationNumber, TimeUnit.MINUTES.toMillis(3)); // 3분
	}

	@Override
	@Transactional
	public void checkCertificationNumber(PhoneVerificationCheckRequest phoneVerificationCheckRequest,
		SecurityUserDto securityUserDto) {
		String phoneNumber = phoneVerificationCheckRequest.phoneNumber();

		if (!redisUtil.getData(phoneNumber).equals(phoneVerificationCheckRequest.verificationNumber())) {
			throw new MemberException(MemberExceptionCode.MISMATCH_PHONE_CERTIFICATION_NUMBER);
		}
		Member findMember = memberRepository.findById(securityUserDto.getMemberId())
			.orElseThrow(() -> new MemberException(MemberExceptionCode.NOT_FOUND_MEMBER));

		findMember.registerPhoneNumber(phoneNumber);
	}

	@Override
	public void sendAccountCertificationNumber(
		AccountVerificationRequest accountVerificationRequest,
		SecurityUserDto securityUserDto
	) {
		bankUtil.transferAccountOneWon(accountVerificationRequest.bankCode(), accountVerificationRequest.accountNo(),
			securityUserDto.getUserKey());
	}

	@Override
	public void checkCertificationWord(AccountVerificationCheckRequest accountVerificationCheckRequest,
		SecurityUserDto securityUserDto) {
		String verificationWord = accountVerificationCheckRequest.verificationWord();
		if (!verificationWord.equals("일촉즉발")) {
			throw new MemberException(MemberExceptionCode.MISMATCH_ACCOUNT_CERTIFICATION_WORD);
		}

		Account account = Account.builder()
			.bankCode(accountVerificationCheckRequest.bankCode())
			.accountNo(accountVerificationCheckRequest.accountNo())
			.member(memberRepository.findById(securityUserDto.getMemberId())
				.orElseThrow(() -> new MemberException(MemberExceptionCode.NOT_FOUND_MEMBER)))
			.isMainAccount(true)
			.build();
		accountRepository.save(account);
	}

	@Override
	public void setPaymentPassword(PaymentPasswordRequest paymentPasswordRequest, SecurityUserDto securityUserDto) {
		redisUtil.setData(securityUserDto.getEmail(), paymentPasswordRequest.paymentPassword(),
			TimeUnit.MINUTES.toMillis(1));
	}

	@Override
	@Transactional
	public TokenDto reEnterPaymentPassword(PaymentPasswordRequest paymentPasswordRequest,
		SecurityUserDto securityUserDto) {
		String paymentPassword = redisUtil.getData(securityUserDto.getEmail());
		if (!paymentPassword.equals(paymentPasswordRequest.paymentPassword())) {
			throw new MemberException(MemberExceptionCode.MISMATCH_PAYMENT_PASSWORD_CERTIFICATION);
		}
		Member findMember = memberRepository.findById(securityUserDto.getMemberId())
			.orElseThrow(IllegalAccessError::new);

		// pay password 설정 및 권한 변경
		findMember.registerPaymentPassword(paymentPassword);

		return jwtUtil.generateToken(findMember.getEmail(), findMember.getMemberRole().getValue());
	}

	// 랜덤으로 6자리 생성
	private int createRandomNumber() {
		return (int)(Math.random() * 900000) + 100000;
	}
}
