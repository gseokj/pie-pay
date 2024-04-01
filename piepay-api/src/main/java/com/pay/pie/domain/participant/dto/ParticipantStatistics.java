package com.pay.pie.domain.participant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ParticipantStatistics {

	private Long memberId;
	private Long payCount;
	private Long payTotal;

}
