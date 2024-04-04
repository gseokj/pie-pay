package com.pay.pie.domain.participant.application;

import java.util.List;

import com.pay.pie.domain.participant.dto.reponse.SelectedPartiesRes;
import com.pay.pie.domain.participant.dto.request.ParticipantReq;
import com.pay.pie.global.security.dto.SecurityUserDto;

public interface ParticipantService {

	SelectedPartiesRes selectParticipant(Long meetId, SecurityUserDto securityUserDto,
		List<ParticipantReq> participants);

	SelectedPartiesRes getParticipant(Long payId);
}
