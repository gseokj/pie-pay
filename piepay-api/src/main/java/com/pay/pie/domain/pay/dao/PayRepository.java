package com.pay.pie.domain.pay.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.pay.entity.Pay;

@Repository
public interface PayRepository extends JpaRepository<Pay, Long> {
}
