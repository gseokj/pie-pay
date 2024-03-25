package com.pay.pie.domain.order.service;

import java.util.List;
import java.util.Random;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.order.dto.AddOrderRequest;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.domain.store.entity.Store;
import com.pay.pie.domain.store.repository.StoreRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final이 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class OrderService {

	private final OrderRepository orderRepository;
	private final PayRepository payRepository;
	private final StoreRepository storeRepository;

	public Order save(Long payId) {
		AddOrderRequest addOrderRequest = new AddOrderRequest();
		// Order addOrderRequest = new Order();

		Pay pay = payRepository.findById(payId)
			.orElseThrow(() -> new IllegalArgumentException("해당 payId을 가진 Pay를 찾을 수 없음"));
		System.out.println("확인" + pay.getMeet().getId());
		Hibernate.initialize(pay.getMeet());
		addOrderRequest.setPay(pay);

		List<Store> stores = storeRepository.findAll();
		int storesSize = stores.size();
		Random random = new Random();
		int randomIndex = random.nextInt(storesSize);
		addOrderRequest.setStore(stores.get(randomIndex));
		addOrderRequest.setTotalAmount(99999L);

		addOrderRequest.setPaymentStatus(Order.PaymentStatus.UNPAID);

		return orderRepository.save(addOrderRequest.toEntity());
	}

}
