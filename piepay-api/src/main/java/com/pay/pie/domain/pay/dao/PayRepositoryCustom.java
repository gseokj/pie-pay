package com.pay.pie.domain.pay.dao;

import java.util.List;

import com.pay.pie.domain.participant.entity.Participant;

public interface PayRepositoryCustom {
	//QueryDSL 로 커스텀해서 사용할 메소드 선언하는 파일
	List<Participant> findParticipantsByPayId(Long payId);

}
