package com.pay.pie.domain.participant.dao;

public interface ParticipantRepositoryCustom {
	//QueryDSL 로 커스텀해서 사용할 메소드 선언하는 파일
	Long getTotalParticipants(Long payId);

	// boolean existsParticipantByIdAndPayId(Long participantId, Long payId);

}
