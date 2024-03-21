package com.pay.pie.domain.pay.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.pay.entity.Pay;

@Repository
public interface PayRepository extends JpaRepository<Pay, Long>, PayRepositoryCustom {
	List<Pay> findByMeetOrderByCreatedAtDesc(Meet meet);

	Pay findFirstByMeetOrderByCreatedAtDesc(Meet meet);

}
