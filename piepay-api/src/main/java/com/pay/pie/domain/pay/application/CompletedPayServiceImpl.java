package com.pay.pie.domain.pay.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.order.dto.response.ReceiptRes;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.orderMenu.dto.OrderMenuDto;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.orderMenu.repository.OrderMenuRepository;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.dto.ParticipantInfoDto;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.dto.response.PayInfoRes;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.domain.payInstead.dao.PayInsteadRepository;
import com.pay.pie.domain.payInstead.dto.PayInsteadDto;
import com.pay.pie.domain.payInstead.entity.PayInstead;
import com.pay.pie.domain.store.dto.StoreInfoDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompletedPayServiceImpl implements CompletedPayService {

	private final PayRepository payRepository;
	private final PayInsteadRepository payInsteadRepository;
	private final ParticipantRepository participantRepository;
	private final OrderRepository orderRepository;
	private final OrderMenuRepository orderMenuRepository;

	/*
	영수증 조회
	 */
	@Override
	public ReceiptRes getReceipt(Long payId) {
		Order order = orderRepository.findByPayId(payId);
		Pay pay = payRepository.findById(payId).orElseThrow(
			() -> new IllegalArgumentException("해당 Pay 없음")
		);

		// List<Participant> participants = participantRepository.findByPayId(pay.getId());
		// List<ParticipantInfoDto> participantInfoDtoList = participants
		// 	.stream()
		// 	.map(ParticipantInfoDto::of)
		// 	.toList();
		//
		// List<PayInstead> payInsteads = payInsteadRepository.findByPayId(pay.getId());
		// List<PayInsteadDto> payInsteadDtoList = payInsteads
		// 	.stream()
		// 	.map(PayInsteadDto::of)
		// 	.toList();
		//
		List<OrderMenu> orderMenus = orderMenuRepository.findByOrderId(order.getId());

		return ReceiptRes.builder()
			.orderId(order.getId())
			.storeInfo(StoreInfoDto.of(order.getStore()))
			.orderMenus(orderMenus.stream().map(OrderMenuDto::of).toList())
			.totalAmount(order.getTotalAmount())
			.createdAt(pay.getCreatedAt())
			.build();
	}

	/*
	참여자 결제 후 각 금액 정보
	 */
	@Override
	public PayInfoRes getPayInfo(Long payId) {
		Pay pay = payRepository.findById(payId)
			.orElseThrow(
				() -> new IllegalArgumentException("해당 Pay 없음")
			);

		List<Participant> participants = participantRepository.findByPayId(pay.getId());
		List<ParticipantInfoDto> participantInfoDtoList = participants
			.stream()
			.map(ParticipantInfoDto::of)
			.toList();

		List<PayInstead> payInsteads = payInsteadRepository.findByPayId(pay.getId());
		List<PayInsteadDto> payInsteadDtoList = payInsteads
			.stream()
			.map(PayInsteadDto::of)
			.toList();

		return PayInfoRes.builder()
			.participants(participantInfoDtoList)
			.payInsteadList(payInsteadDtoList)
			.build();
	}
}
