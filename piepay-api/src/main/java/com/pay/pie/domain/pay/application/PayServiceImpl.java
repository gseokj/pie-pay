package com.pay.pie.domain.pay.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.dto.response.CompletedPaymentRes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayServiceImpl implements PayService {

	private final PayRepository payRepository;

	@Override
	public CompletedPaymentRes processPayment(Long payId) {

		// 결제 테이블에 가게정보, 영수증 정보 저장

		// 개인 결제 금액 계산

		// 은행 이체 요청 로직

		return null;
	}

	private void calculatePortionCost(Long payId) {
		Long totalPayAmount = payRepository.findById(payId).get().getTotalPayAmount();
		log.info("총금액: {}", totalPayAmount);

	}
}
