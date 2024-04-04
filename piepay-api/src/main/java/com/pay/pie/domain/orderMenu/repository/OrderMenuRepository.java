package com.pay.pie.domain.orderMenu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

	OrderMenu findByMenuAndOrder(Menu menu, Order order);

	Optional<OrderMenu> findAllByOrder(Order order);

	List<OrderMenu> findByOrderId(Long orderId);
}
