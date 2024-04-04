package com.pay.pie.domain.pay.dto.response;

import java.util.List;

import com.pay.pie.domain.participant.dto.ParticipantInfoDto;
import com.pay.pie.domain.payInstead.dto.PayInsteadDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class PayInfoRes {

	private List<ParticipantInfoDto> participants;
	private List<PayInsteadDto> payInsteadList;
}
