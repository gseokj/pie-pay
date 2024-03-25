package com.pay.pie.domain.order.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.participant.dto.CompletedPaymentParticipantDto;
import com.pay.pie.domain.payInstead.dao.PayInsteadRepository;
import com.pay.pie.domain.payInstead.dto.PayInsteadDto;
import com.pay.pie.domain.store.dto.StoreInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@Builder
public class ReceiptRes {

	private Long id;
	private StoreInfoDto storeInfo;
	private Long totalAmount;
	private List<CompletedPaymentParticipantDto> completedPaymentParticipantDtoList;
	private List<PayInsteadDto> payInsteadDtoList;
	private List<OrderMenu> orderManus;
	private LocalDateTime createdAt;

	private final PayInsteadRepository payInsteadRepository;

	// public ReceiptRes of(Order order, Pay pay) {
	// 	List<PayInstead> payInsteadList = payInsteadRepository.findByPayId(pay.getId());
	// 	List<PayInsteadDto> payInsteadDtoList = payInsteadList.stream()
	// 		.map(payInstead -> PayInsteadDto.builder()
	// 			.borrowerId(payInstead.getBorrower().getId())
	// 			.lenderId(payInstead.getLender().getId())
	// 			.amount(payInstead.getAmount())
	// 			.payback(payInstead.getPayback())
	// 			.build())
	// 		.collect(Collectors.toList());
	//
	// 	List<CompletedPaymentParticipantDto> completedPaymentParticipantDtoList = pay.getParticipants().stream()
	// 		.filter(participant -> participant.getPayAgree() && participant.getPayAmount() > 0)
	// 		.map(CompletedPaymentParticipantDto::of)
	// 		.collect(Collectors.toList());
	//
	// 	return ReceiptRes.builder()
	// 		.id(order.getId())
	// 		.storeInfo(StoreInfoDto.of(order.getStore()))
	// 		.totalAmount(order.getTotalAmount())
	// 		.completedPaymentParticipantDtoList(order.getCompletedPaymentParticipantList().stream()
	// 			.map(CompletedPaymentParticipantDto::of)
	// 			.collect(Collectors.toList()))
	// 		.payInsteadDtoList(payInsteadDtoList)
	// 		.orderMenus(order.getOrderMenus())
	// 		.createdAt(order.getCreatedAt())
	// 		.build();
	// }

}
