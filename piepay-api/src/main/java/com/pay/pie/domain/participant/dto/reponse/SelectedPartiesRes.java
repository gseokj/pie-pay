package com.pay.pie.domain.participant.dto.reponse;

import java.time.LocalDateTime;
import java.util.List;

import com.pay.pie.domain.participant.dto.ParticipantDto;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class SelectedPartiesRes {

	private Long payId;
	private Long meetId;
	private Pay.PayStatus payStatus;
	private LocalDateTime createAt;
	private List<ParticipantDto> participants;

	public static SelectedPartiesRes of(Pay pay, List<ParticipantDto> participants) {
		return SelectedPartiesRes.builder()
			.payId(pay.getId())
			// .meetId(pay.getMeet().getId())
			.payStatus(pay.getPayStatus())
			.createAt(pay.getCreatedAt())
			.participants(participants)
			.build();
	}
}
