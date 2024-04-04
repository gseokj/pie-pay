package com.pay.pie.domain.pay.dto.response;

import java.time.LocalDateTime;

import com.pay.pie.domain.pay.entity.Pay;

import lombok.Getter;

@Getter
public class PayStatusIngResponse {
	private final Long payId;
	private final Pay.PayStatus payStatus;
	private final Long meetId;
	private final String meetName;
	private final LocalDateTime updatedAt;

	public PayStatusIngResponse(Pay pay) {
		this.payId = pay.getId();
		this.payStatus = pay.getPayStatus();
		this.meetId = pay.getMeet().getId();
		this.meetName = pay.getMeet().getMeetName();
		this.updatedAt = pay.getUpdatedAt();
	}
}
