package com.pay.pie.domain.payInstead.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MyPayInsteadResponse {
	private List<PayInsteadDto> lent; // 사용자가 받아야할 돈
	private List<PayInsteadDto> borrowed; // 사용자가 갚아야할 돈

	public static MyPayInsteadResponse of(List<PayInsteadDto> lent, List<PayInsteadDto> borrowed) {
		return MyPayInsteadResponse.builder()
			.lent(lent)
			.borrowed(borrowed)
			.build();
	}
}
