package com.pay.pie.domain.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.order.service.OrderService;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class OrderApiController {

	private final OrderService orderService;

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PostMapping("/receipt/{payId}")
	public ResponseEntity<BaseResponse<Order>> addReceipt(@PathVariable Long payId) {
		Order order = orderService.save(payId);

		return BaseResponse.success(
			SuccessCode.INSERT_SUCCESS,
			order);
	}
}
