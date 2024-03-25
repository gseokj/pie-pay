package com.pay.pie.domain.application.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class InsteadRes {

	private final Long payId;
	private final Long borrowerId;
	private final Long lenderId;

}
