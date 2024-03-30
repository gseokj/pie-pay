package com.pay.pie.domain.order.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.pay.entity.Pay;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	Order findByPayId(Long payId);

	List<Order> findAllByPay(Pay pay);

	@Query("SELECT om FROM OrderMenu om WHERE om.order.id = :orderId")
	List<OrderMenu> getOrderMenuById(Long orderId);

	@Query("SELECT SUM(om.quantity * m.menuPrice) "
		+ "FROM OrderMenu om "
		+ "JOIN om.menu m "
		+ "WHERE om.order.id = :orderId "
		+ "AND m.menuCategory = 'NON_ALCOHOL'")
	Long getTotalNonAlcoholPrice(Long orderId);

	@Query("SELECT SUM(om.quantity * m.menuPrice) "
		+ "FROM OrderMenu om "
		+ "JOIN om.menu m "
		+ "WHERE om.order.id = :orderId "
		+ "AND m.menuCategory = 'ALCOHOL'")
	Long getTotalAlcoholPrice(Long orderId);
}
