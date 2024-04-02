package com.pay.pie.domain.meet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeetPaymentInfo {

	private Long totalMeetCount;
	private Long totalPayment;
	private Double averagePayment;
}
