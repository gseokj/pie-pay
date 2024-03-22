package com.pay.pie.domain.orderMenu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

	OrderMenu findByMenuAndOrder(Menu menu, Order order);
}
