package com.pay.pie.domain.pay.dto;

import java.time.LocalDateTime;

import com.pay.pie.domain.meet.dto.MeetDto;
import com.pay.pie.domain.pay.entity.Pay;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class LatestPayRes {

	private final LocalDateTime createdAt;
	private final LocalDateTime updateAt;
	private final Long id;
	private final MeetDto meet;
	private final Pay.PayStatus payStatus;
	private final Long openerId;
	private final Long totalPayAmount;

}
