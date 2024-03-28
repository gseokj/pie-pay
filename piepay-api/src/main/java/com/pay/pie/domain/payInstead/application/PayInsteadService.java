package com.pay.pie.domain.payInstead.application;

import com.pay.pie.global.security.dto.SecurityUserDto;

public interface PayInsteadService {

	void paybackInsteadPayment(Long payInsteadId, SecurityUserDto securityUserDto);
}
