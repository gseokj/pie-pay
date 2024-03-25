package com.pay.pie.domain.payInstead.dto;

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

}
