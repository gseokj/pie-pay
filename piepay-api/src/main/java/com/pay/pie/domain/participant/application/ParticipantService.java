package com.pay.pie.domain.participant.application;

import java.util.List;

import com.pay.pie.domain.participant.dto.reponse.ParticipantRes;
import com.pay.pie.domain.participant.dto.request.ParticipantReq;

public interface ParticipantService {

	List<ParticipantRes> selectParticipant(Long openerId, List<ParticipantReq> participants);
}
