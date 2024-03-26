package com.pay.pie.domain.payInstead.dto;

import com.pay.pie.domain.payInstead.entity.PayInstead;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class PayInsteadDto {

	private final Long borrowerId;
	private final Long lenderId;
	private final Long amount;
	private final boolean payback;

	public static PayInsteadDto of(PayInstead payInstead) {
		return PayInsteadDto.builder()
			.borrowerId(payInstead.getBorrower().getId())
			.lenderId(payInstead.getLender().getId())
			.amount(payInstead.getAmount())
			.payback(payInstead.getPayback())
			.build();
	}
}
