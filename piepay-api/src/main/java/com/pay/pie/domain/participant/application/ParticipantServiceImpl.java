package com.pay.pie.domain.participant.application;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pay.pie.domain.meet.entity.Meet;
import com.pay.pie.domain.meet.repository.MeetRepository;
import com.pay.pie.domain.member.dao.MemberRepository;
import com.pay.pie.domain.notification.service.SseEmitterService;
import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.participant.dao.ParticipantRepository;
import com.pay.pie.domain.participant.dto.ParticipantDto;
import com.pay.pie.domain.participant.dto.reponse.MyParticipantResponse;
import com.pay.pie.domain.participant.dto.reponse.SelectedPartiesRes;
import com.pay.pie.domain.participant.dto.request.ParticipantReq;
import com.pay.pie.domain.participant.entity.Participant;
import com.pay.pie.domain.pay.dao.PayRepository;
import com.pay.pie.domain.pay.entity.Pay;
import com.pay.pie.global.security.dto.SecurityUserDto;
import com.pay.pie.global.util.bank.BankUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

	private final ParticipantRepository participantRepository;
	private final MemberRepository memberRepository;
	private final PayRepository payRepository;
	private final MeetRepository meetRepository;
	private final SseEmitterService sseEmitterService;
	private final BankUtil bankUtil;
	private final OrderRepository orderRepository;

	@Override
	public SelectedPartiesRes selectParticipant(
		Long meetId,
		SecurityUserDto securityUserDto,
		List<ParticipantReq> participants) {

		List<ParticipantDto> participantDtoList = new ArrayList<>();

		/*
		openerId로 가상계좌 생성
		 */
		//
		Long openerId = securityUserDto.getMemberId();
		// 국민은행 가상계좌 생성
		// String openerUserKey = securityUserDto.getUserKey();
		// OpenAccountRes virtualAccount = bankUtil.openAccount(
		// 	openerUserKey, "004-1-74fe2deafd3277").getBody();

		// Pay 테이블 생성
		Meet meet = meetRepository.findById(meetId).orElseThrow(
			() -> new IllegalArgumentException("없는 meetId")
		);
		Pay pay = payRepository.save(Pay.builder()
			.payStatus(Pay.PayStatus.OPEN)
			.meet(meet)
			.openerId(openerId)
			.build());

		// 참여자 저장
		for (ParticipantReq info : participants) {
			Participant participant = Participant.builder()
				.pay(pay)
				.member(memberRepository.findById(info.getMemberId())
					.orElseThrow(
						() -> new IllegalArgumentException("없는 사용자임")
					))
				.isDrinkAlcohol(info.getIsDrinkAlcohol())
				.build();
			log.info("참석자: {}", participant);
			participantRepository.save(participant);
			ParticipantDto participantRes = ParticipantDto.of(participant);
			participantDtoList.add(participantRes);

			// 알림
			if (!participant.getMember().getId().equals(openerId)) {
				sseEmitterService.sendNotification(
					participant.getMember().getId(),
					2L,
					meet.getMeetName() + "의 결제에 참여해주세요!",
					pay.getId());
			}
		}

		SelectedPartiesRes selectedPartiesRes = SelectedPartiesRes.of(pay, participantDtoList);

		return selectedPartiesRes;
	}

	@Override
	public SelectedPartiesRes getParticipant(Long payId) {
		Pay pay = payRepository.findById(payId)
			.orElseThrow(() -> new IllegalArgumentException("해당 payId에 대한 정보를 찾을 수 없습니다."));

		List<Participant> participants = participantRepository.findByPayId(payId);
		List<ParticipantDto> participantDtoList = participants
			.stream()
			.map(ParticipantDto::of)
			.collect(Collectors.toList());

		SelectedPartiesRes selectedPartiesRes = SelectedPartiesRes.of(pay, participantDtoList);

		return selectedPartiesRes;
	}

	public List<MyParticipantResponse> myParticipant(Long memberId) {

		return participantRepository.getAllByMemberIdOrderByUpdatedAtDesc(memberId)
			.stream()
			// 데이터 제대로 들어가면 필터 필요없음
			.filter(participant -> orderRepository.findByPayId(participant.getPay().getId()) != null)
			.map(participant -> MyParticipantResponse.of(
				participant, orderRepository.findByPayId(participant.getPay().getId()).getStore()))
			.toList();
	}
}
