package com.pay.pie.domain.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class AgreeReq {

	private final Long payId;
	private final boolean payAgree;
}
