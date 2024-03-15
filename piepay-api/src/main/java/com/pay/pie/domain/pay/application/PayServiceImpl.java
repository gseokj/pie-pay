package com.pay.pie.domain.pay.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.order.dto.response.ReceiptRes;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PayServiceImpl implements PayService {

	private final PayRepository payRepository;
	private final OrderRepository orderRepository;
	// private final JPAQueryFactory query;

	@Override
	@Transactional(readOnly = true)
	public ReceiptRes getReceipt(Long payId) {
		Order order = orderRepository.findByPayId(payId);
		Pay pay = payRepository.findById(payId).orElseThrow(
			() -> new IllegalArgumentException("해당 Pay 없음")
		);

		return ReceiptRes.of(order, pay);
		// return null;
	}
}
