package com.pay.pie.domain.pay.application;

import com.pay.pie.domain.pay.dto.response.CompletedPaymentRes;

public interface PayService {
	CompletedPaymentRes processPayment(Long payId);
}
