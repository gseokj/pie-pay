package com.pay.pie.domain.payInstead.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MyPayInsteadResponse {
	private List<MyPayInsteadDto> myLent; // 사용자가 받아야할 돈
	private List<MyPayInsteadDto> myBorrowed; // 사용자가 갚아야할 돈

	public static MyPayInsteadResponse of(List<MyPayInsteadDto> myLent, List<MyPayInsteadDto> myBorrowed) {
		return MyPayInsteadResponse.builder()
			.myLent(myLent)
			.myBorrowed(myBorrowed)
			.build();
	}
}
