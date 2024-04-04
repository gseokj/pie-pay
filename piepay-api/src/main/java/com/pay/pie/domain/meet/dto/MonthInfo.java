package com.pay.pie.domain.meet.dto;

import lombok.Getter;

@Getter
public class MonthInfo {

	private int month;
	private Long paymentCount;

	public MonthInfo(int month, Long paymentCount){
		this.month = month;
		this.paymentCount = paymentCount;
	}

}
