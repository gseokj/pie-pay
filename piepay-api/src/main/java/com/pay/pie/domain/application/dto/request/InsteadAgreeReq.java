package com.pay.pie.domain.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class InsteadAgreeReq {

	private final Long payId;
	private final Long borrowerId;
	private final Long lenderId;
}
