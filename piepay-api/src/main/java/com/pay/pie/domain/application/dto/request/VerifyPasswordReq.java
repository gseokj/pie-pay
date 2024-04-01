package com.pay.pie.domain.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
public class VerifyPasswordReq {

	private String payPassword;

}
