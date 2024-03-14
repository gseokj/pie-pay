package com.pay.pie.domain.pay.application;

import com.pay.pie.domain.order.dto.response.ReceiptRes;

public interface PayService {
	ReceiptRes getReceipt(Long payId);
}
