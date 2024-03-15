package com.pay.pie.domain.pay.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.global.common.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/pay/payment")
@RequiredArgsConstructor
public class PayController {

	@PostMapping("/{payId}")
	public ResponseEntity<BaseResponse<String>> processPayment(@PathVariable Long payId) {
		return null;
	}
}
