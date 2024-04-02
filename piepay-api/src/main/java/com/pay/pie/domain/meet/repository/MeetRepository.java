package com.pay.pie.domain.meet.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pay.pie.domain.meet.entity.Meet;

import io.lettuce.core.dynamic.annotation.Param;

public interface MeetRepository extends JpaRepository<Meet, Long> {

	@Query
		(
			"""
					SELECT m
					FROM Meet m
					JOIN FETCH m.memberMeetList	 ml
					JOIN FETCH ml.member
					WHERE m.meetInvitation = :meetInvitation
			"""
		)
	Optional<Meet> findByMeetInvitation(@Param("meetInvitation") String meetInvitation);

	@Query(
		"""
			select m
			from Meet m
			where m.id = :meetId
						"""
	)
	Object[] getHighlight(@Param("meetId") Long meetId);

	@Query(
		"""
						SELECT m
						FROM Meet m
						JOIN FETCH  m.memberMeetList
						WHERE m.id = :meetId
			"""
	)
	Meet findMeetInfo(@Param("meetId") Long meetId);

	@Query
		(
			"""
						SELECT mt.id
						FROM Meet mt
						JOIN  mt.memberMeetList ml
						WHERE ml.member.id = :memberId
				"""
		)
	List<Long> findMeetListByMemberId(@Param("memberId") Long memberId);

	@Query
		(
			"""
					SELECT mt
					FROM Meet mt
					JOIN FETCH mt.memberMeetList ml
					JOIN FETCH ml.member
					WHERE mt.id IN(:meets)
				"""
		)
	List<Meet> findMembersInMeetList(@Param("meets") List<Long> meets);

	// 모임의 결제 리스트
	@Query(
		"""
  		SELECT m
  		FROM Meet m
  		JOIN FETCH m.payList
  		WHERE m.id = :meetId
		"""
	)
	Meet getMeetPayInfo(@Param("meetId") Long meetId);

}
