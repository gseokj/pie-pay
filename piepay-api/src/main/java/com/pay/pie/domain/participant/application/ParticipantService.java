package com.pay.pie.domain.participant.application;

import java.util.List;

import com.pay.pie.domain.participant.dto.request.ParticipantReq;

public interface ParticipantService {

	void selectParticipant(Long payId, List<ParticipantReq> participants);
}
