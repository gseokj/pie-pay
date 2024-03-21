package com.pay.pie.domain.payInstead.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.payInstead.entity.PayInstead;

@Repository
public interface PayInsteadRepository extends JpaRepository<PayInstead, Long> {
}
