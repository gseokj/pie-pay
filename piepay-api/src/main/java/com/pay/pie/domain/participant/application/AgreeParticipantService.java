package com.pay.pie.domain.participant.application;

public interface AgreeParticipantService {

	// public void requestAgreement(Long participantId);

	public void respondToAgreement(Long payId, Long participantId);

}
