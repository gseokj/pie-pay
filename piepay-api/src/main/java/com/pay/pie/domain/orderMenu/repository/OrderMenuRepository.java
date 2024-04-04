package com.pay.pie.domain.orderMenu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.pay.entity.Pay;

import io.lettuce.core.dynamic.annotation.Param;

public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

	OrderMenu findByMenuAndOrder(Menu menu, Order order);
	List<OrderMenu> findByOrderId(Long orderId);

	@Query(
		"""
	SELECT COUNT(om)
	FROM OrderMenu om
	JOIN om.order.pay p
	JOIN om.menu m
	WHERE p in :payList AND m.menuCategory = "ALCOHOL"
"""
	)
	Long getAlcoholCount(@Param("payList") List<Pay> payList);
}
