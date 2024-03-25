package com.pay.pie.domain.payInstead.application;

public interface PayInsteadService {

	public void requestPayInstead(Long payId, Long borrowId);

	public void respondToPayInstead(Long payId, Long borrowId, Long lenderId, boolean agreed);
}
