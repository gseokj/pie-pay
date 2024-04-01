package com.pay.pie.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Component
@Getter
@RequiredArgsConstructor
public class PiePayUtil {

	@Value("001")
	private String piePayBankCode;
	@Value("0013195523843350")
	private String piePayAccount;
	@Value("e55f841b-44ef-443e-9130-90a27c801d96")
	private String piePayApiKey;

	// public PiePayUtil(
	// 	@Value(value = "001") String bankCode,
	// 	@Value(value = "0013195523843350") String account,
	// 	@Value(value = "e55f841b-44ef-443e-9130-90a27c801d96") String apiKey)
}
