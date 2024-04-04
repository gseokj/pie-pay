package com.pay.pie.domain.order.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.pay.pie.domain.orderMenu.dto.OrderMenuDto;
import com.pay.pie.domain.store.dto.StoreInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class ReceiptRes {

	private Long orderId;
	private StoreInfoDto storeInfo;
	private List<OrderMenuDto> orderMenus;
	private Long totalAmount;
	private LocalDateTime createdAt;

}
