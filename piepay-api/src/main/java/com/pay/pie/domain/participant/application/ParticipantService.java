package com.pay.pie.domain.participant.application;

import java.util.List;

import com.pay.pie.domain.participant.dto.reponse.SelectedPartiesRes;
import com.pay.pie.domain.participant.dto.request.ParticipantReq;

public interface ParticipantService {

	SelectedPartiesRes selectParticipant(Long meetId, Long openerId, List<ParticipantReq> participants);

}
