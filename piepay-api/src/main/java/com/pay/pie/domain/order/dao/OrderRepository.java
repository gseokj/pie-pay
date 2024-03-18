package com.pay.pie.domain.order.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.order.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	Order findByPayId(Long payId);
}
