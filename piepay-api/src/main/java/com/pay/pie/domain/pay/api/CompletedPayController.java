package com.pay.pie.domain.pay.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.order.dto.response.ReceiptRes;
import com.pay.pie.domain.pay.application.CompletedPayService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/pay")
@RequiredArgsConstructor
public class CompletedPayController {

	private final CompletedPayService payService;

	/**
	 * 해당 결제 영수증 조회
	 * @param payId 결제 ID
	 * @return 영수증 정보
	 */
	@GetMapping("/receipt/{payId}")
	public ResponseEntity<BaseResponse<ReceiptRes>> getReceipt(@PathVariable Long payId) {
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			payService.getReceipt(payId));
	}

}
