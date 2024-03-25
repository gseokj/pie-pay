package com.pay.pie.domain.order.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.domain.store.dto.StoreInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceiptRes {

	private Long id;
	private StoreInfoDto storeInfo;
	private Long totalAmount;
	private LocalDateTime createdAt;
	private List<OrderMenu> orderManus;

	public static ReceiptRes of(Order order, Pay pay) {
		return ReceiptRes.builder()
			.storeInfo(StoreInfoDto.of(order.getStore()))
			.totalAmount(order.getTotalAmount())
			.createdAt(order.getCreatedAt())
			// .orderManus(order.get)
			.build();
	}

}
