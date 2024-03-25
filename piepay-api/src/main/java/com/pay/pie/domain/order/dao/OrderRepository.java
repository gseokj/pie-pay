package com.pay.pie.domain.order.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.pay.entity.Pay;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	Order findByPayId(Long payId);

	List<Order> findAllByPay(Pay pay);
}
