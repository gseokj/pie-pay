package com.pay.pie.domain.orderMenu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.dto.AddOrderMenuRequest;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.orderMenu.repository.OrderMenuRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final이 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class OrderMenuService {

	private final OrderMenuRepository orderMenuRepository;
	private final OrderRepository orderRepository;

	public OrderMenu save(AddOrderMenuRequest request) {

		return orderMenuRepository.save(request.toEntity());
	}

	public List<OrderMenu> findByOrderId(Long orderId) {

		return orderMenuRepository.findByOrderId(orderId);
	}

	public OrderMenu findByMenuAndOrder(Menu menu, Order order) {
		return orderMenuRepository.findByMenuAndOrder(menu, order);
	}
}
