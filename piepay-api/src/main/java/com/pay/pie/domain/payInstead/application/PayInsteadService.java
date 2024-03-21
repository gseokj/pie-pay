package com.pay.pie.domain.payInstead.application;

public interface PayInsteadService {

	public void requestPayInstead(Long participantId, Long payInsteadId);

	public void respondToPayInstead(Long participantId, boolean agreed);
}
