package com.pay.pie.domain.payInstead.dto;

import java.time.LocalDateTime;

import com.pay.pie.domain.payInstead.entity.PayInstead;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MyPayInsteadDto {

	private final Long payInsteadId;
	private final String borrowerName;
	private final String borrowerProfile;
	private final String lenderName;
	private final String lenderProfile;
	private final Long amount;
	private final boolean payback;
	private final LocalDateTime createdAt;

	public static MyPayInsteadDto of(PayInstead payInstead) {
		return MyPayInsteadDto.builder()
			.payInsteadId(payInstead.getId())
			.borrowerName(payInstead.getBorrower().getNickname())
			.borrowerProfile(payInstead.getBorrower().getProfileImage())
			.lenderName(payInstead.getLender().getNickname())
			.lenderProfile(payInstead.getLender().getProfileImage())
			.amount(payInstead.getAmount())
			.payback(payInstead.getPayback())
			.createdAt(payInstead.getCreatedAt())
			.build();
	}
}
