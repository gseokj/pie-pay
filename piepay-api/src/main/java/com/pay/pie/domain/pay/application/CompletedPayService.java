package com.pay.pie.domain.pay.application;

import com.pay.pie.domain.order.dto.response.ReceiptRes;
import com.pay.pie.domain.pay.dto.response.PayInfoRes;

public interface CompletedPayService {
	ReceiptRes getReceipt(Long payId);

	PayInfoRes getPayInfo(Long payId);
}
