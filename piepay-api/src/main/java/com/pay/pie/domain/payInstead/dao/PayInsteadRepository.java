package com.pay.pie.domain.payInstead.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.payInstead.entity.PayInstead;

@Repository
public interface PayInsteadRepository extends JpaRepository<PayInstead, Long> {

	List<PayInstead> findByPayId(Long payId);

	List<PayInstead> getAllByLenderIdOrderByCreatedAtDesc(Long memberId);

	List<PayInstead> getAllByBorrowerIdOrderByCreatedAtDesc(Long memberId);

	List<PayInstead> getAllByLenderIdOrBorrowerIdOrderByCreatedAtDesc(Long memberId1, Long memberId2);
}
