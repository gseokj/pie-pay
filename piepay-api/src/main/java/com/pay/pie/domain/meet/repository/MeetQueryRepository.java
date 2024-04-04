package com.pay.pie.domain.meet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pay.pie.domain.meet.dto.MeetPaymentInfo;
import com.pay.pie.domain.meet.entity.Meet;

import io.lettuce.core.dynamic.annotation.Param;

public interface MeetQueryRepository extends JpaRepository<Meet, Long> {

	@Query(
		"""
					  SELECT new com.pay.pie.domain.meet.dto.
					  MeetPaymentInfo(COUNT(p.id), SUM(p.totalPayAmount), AVG(p.totalPayAmount) )
					  FROM Pay p
					  WHERE p.meet.id = :meetId
			"""
	)
	MeetPaymentInfo getTotalMountAndMeetCount(@Param("meetId") Long meetId);

}
