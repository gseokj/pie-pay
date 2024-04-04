package com.pay.pie.global.util.bank;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import net.minidev.json.JSONObject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pay.pie.global.util.bank.dto.Account;
import com.pay.pie.global.util.bank.dto.AccountListResponse;
import com.pay.pie.global.util.bank.dto.AccountResponse;
import com.pay.pie.global.util.bank.dto.ErrorResponse;
import com.pay.pie.global.util.bank.dto.MemberResponse;
import com.pay.pie.global.util.bank.dto.OpenAccountRes;
import com.pay.pie.global.util.bank.dto.TransferAccountOneWonResponse;
import com.pay.pie.global.util.bank.dto.TransferAccountResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class BankUtil {

	private final String API_KEY;
	private final RestTemplate restTemplate;
	private final HttpHeaders headers = new HttpHeaders();
	private final String CREATE_USER_URL;
	private final String FIND_ACCOUNT_URL;
	private final String INQUIRE_ACCOUNT_LIST_URL;
	private final String INQUIRE_ACCOUNT_URL;
	private final String INQUIRE_ACCOUNT_BALANCE_URL;
	private final String RECEIVE_TRANSFER_ACCOUNT_URL;
	private final String TRANSFER_ACCOUNT_URL;
	private final String OPEN_ACCOUNT_URL;

	public BankUtil(
		@Value(value = "${bank.api-key}") String apiKey,
		@Value(value = "${bank.url.create-user}") String createAccountUrl,
		@Value(value = "${bank.url.find-user}") String findAccountUrl,
		@Value(value = "${bank.url.inquire-account-list}") String inquireAccountListUrl,
		@Value(value = "${bank.url.inquire-account}") String inquireAccountUrl,
		@Value(value = "${bank.url.inquire-account-balance}") String inquireAccountBalanceUrl,
		@Value(value = "${bank.url.receiveTransferAccount}") String receiveTransferAccountUrl,
		@Value(value = "${bank.url.transfer-account}") String transferAccountUrl,
		@Value(value = "https://finapi.p.ssafy.io/ssafy/api/v1/edu/account/openAccount") String openAccountUrl,
		RestTemplate restTemplate
	) {
		API_KEY = apiKey;
		CREATE_USER_URL = createAccountUrl;
		FIND_ACCOUNT_URL = findAccountUrl;
		INQUIRE_ACCOUNT_LIST_URL = inquireAccountListUrl;
		INQUIRE_ACCOUNT_URL = inquireAccountUrl;
		INQUIRE_ACCOUNT_BALANCE_URL = inquireAccountBalanceUrl;
		RECEIVE_TRANSFER_ACCOUNT_URL = receiveTransferAccountUrl;
		TRANSFER_ACCOUNT_URL = transferAccountUrl;
		OPEN_ACCOUNT_URL = openAccountUrl;
		this.restTemplate = restTemplate;
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	// 사용자 계정 생성
	public String createUser(String email) {
		// body
		JSONObject requestBody = new JSONObject();
		requestBody.put("apiKey", API_KEY);
		requestBody.put("userId", email);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		// request entity 객체 생성
		HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
		// 요청
		try {
			ResponseEntity<MemberResponse> response = restTemplate.exchange(
				CREATE_USER_URL,
				HttpMethod.POST,
				entity,
				MemberResponse.class
			);

			// 회원 API-KEY
			return response.getBody().getPayload().getUserKey();

		} catch (HttpClientErrorException e) {

			String responseBody = e.getResponseBodyAsString();
			ObjectMapper objectMapper = new ObjectMapper();

			ErrorResponse errorResponse = null;

			try {
				errorResponse = objectMapper.readValue(responseBody, ErrorResponse.class);
			} catch (JsonProcessingException ex) {
				throw new RuntimeException(ex);
			}

			if (errorResponse.getResponseCode().equals("E4002")) {
				return findUserAccount(email);
			}

			throw new RuntimeException("Asdf");
		}
	}

	// 사용자 계정 조회
	public String findUserAccount(String email) {

		JSONObject requestBody = new JSONObject();
		requestBody.put("apiKey", API_KEY);
		requestBody.put("userId", email);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

		ResponseEntity<MemberResponse> response = restTemplate.exchange(
			FIND_ACCOUNT_URL,
			HttpMethod.POST,
			entity,
			MemberResponse.class
		);

		return response.getBody().getPayload().getUserKey();
	}

	// 사용자 전체 계좌 조회
	public void inquireAccountList(String memberApiKey) {

		Map<String, String> body = new HashMap<>();
		body.put("apiName", "inquireAccountList");
		body.put("transmissionDate", "20240101");
		body.put("transmissionTime", "121212");
		body.put("institutionCode", "00100");
		body.put("fintechAppNo", "001");
		body.put("apiServiceCode", "inquireAccountList");
		body.put("institutionTransactionUniqueNo", createRandomNumber());
		body.put("apiKey", API_KEY);
		body.put("userKey", "587a94fa-804d-4338-afce-ec861341b754");

		JSONObject requestBody = new JSONObject();
		requestBody.put("Header", body);

		HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

		ResponseEntity<AccountListResponse> response = restTemplate.exchange(
			INQUIRE_ACCOUNT_LIST_URL,
			HttpMethod.POST,
			entity,
			AccountListResponse.class
		);
	}

	// 사용자 계좌 단건 조회
	public boolean inquireAccount(String bankCode, String accountNo) {

		Map<String, String> body = new HashMap<>();
		body.put("apiName", "inquireAccountInfo");
		body.put("transmissionDate", "20240101");
		body.put("transmissionTime", "121212");
		body.put("institutionCode", "00100");
		body.put("fintechAppNo", "001");
		body.put("apiServiceCode", "inquireAccountInfo");
		body.put("institutionTransactionUniqueNo", createRandomNumber());
		body.put("apiKey", API_KEY);
		body.put("userKey", "d1830ff3-444e-4ecb-92a2-bd5a915d3600");

		JSONObject requestBody = new JSONObject();
		requestBody.put("Header", body);
		requestBody.put("bankCode", bankCode);
		requestBody.put("accountNo", accountNo);

		HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

		try {
			ResponseEntity<AccountResponse> bankResponse = restTemplate.exchange(
				INQUIRE_ACCOUNT_URL,
				HttpMethod.POST,
				entity,
				AccountResponse.class
			);

			Account findAccount = bankResponse.getBody().getAccount();
			if (Objects.nonNull(findAccount)) {
				return findAccount.getAccountNo().equals(accountNo);
			}
			return false;

		} catch (HttpClientErrorException e) {
			sendErrorCode(e.getResponseBodyAsString());
		}

		return false;
	}

	// 회원 계좌 조회
	public String getAccountBalance(String bankCode, String accountNo, String userKey) {

		Map<String, String> body = new HashMap<>();
		body.put("apiName", "inquireAccountBalance");
		body.put("transmissionDate", "20240101");
		body.put("transmissionTime", "121212");
		body.put("institutionCode", "00100");
		body.put("fintechAppNo", "001");
		body.put("apiServiceCode", "inquireAccountBalance");
		body.put("institutionTransactionUniqueNo", createRandomNumber());
		body.put("apiKey", API_KEY );
		body.put("userKey", userKey);

		JSONObject requestBody = new JSONObject();
		requestBody.put("Header", body);
		requestBody.put("bankCode", bankCode);
		requestBody.put("accountNo", accountNo);

		HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

		ResponseEntity<AccountResponse> bankResponse = null;
		try {
			bankResponse = restTemplate.exchange(
				INQUIRE_ACCOUNT_BALANCE_URL,
				HttpMethod.POST,
				entity,
				AccountResponse.class
			);
		} catch (HttpClientErrorException e) {
			sendErrorCode(e.getResponseBodyAsString());
		}

		return bankResponse.getBody().getAccount().getAccountBalance();

	}

	// 회원 계좌 1원 입금
	public void transferAccountOneWon(String bankCode, String accountNo, String userKey) {
		Map<String, String> body = new HashMap<>();
		body.put("apiName", "receivedTransferAccountNumber");
		body.put("transmissionDate", "20240101");
		body.put("transmissionTime", "121212");
		body.put("institutionCode", "00100");
		body.put("fintechAppNo", "001");
		body.put("apiServiceCode", "receivedTransferAccountNumber");
		body.put("institutionTransactionUniqueNo", createRandomNumber());
		body.put("apiKey", API_KEY);
		body.put("userKey", userKey);

		JSONObject jsonRequest = new JSONObject();
		jsonRequest.put("Header", body);
		jsonRequest.put("bankCode", bankCode);
		jsonRequest.put("accountNo", accountNo);
		jsonRequest.put("transactionBalance", "1");
		jsonRequest.put("transactionSummary", "일촉즉발");

		HttpEntity<String> entity = new HttpEntity<>(jsonRequest.toString(), headers);

		try {
			restTemplate.exchange(
				RECEIVE_TRANSFER_ACCOUNT_URL,
				HttpMethod.POST,
				entity,
				TransferAccountOneWonResponse.class
			);
		} catch (HttpClientErrorException e) {
			sendErrorCode(e.getResponseBodyAsString());
		}
	}

	// 이체
	@Async
	public void transferAccount(
		String depositBankCode,
		String depositAccountNo,
		int transactionBalance,
		String withdrawalBankCode,
		String withdrawalAccountNo,
		String userKey
	) {
		Map<String, String> body = new HashMap<>();
		body.put("apiName", "accountTransfer");
		body.put("transmissionDate", "20240101");
		body.put("transmissionTime", "121212");
		body.put("institutionCode", "00100");
		body.put("fintechAppNo", "001");
		body.put("apiServiceCode", "accountTransfer");
		body.put("institutionTransactionUniqueNo", createRandomNumber());
		body.put("apiKey", API_KEY);
		body.put("userKey", userKey);

		JSONObject jsonRequest = new JSONObject();
		jsonRequest.put("Header", body);
		jsonRequest.put("depositBankCode", depositBankCode);
		jsonRequest.put("depositAccountNo", depositAccountNo);
		jsonRequest.put("depositTransactionSummary", "입금이체 계좌");
		jsonRequest.put("transactionBalance", transactionBalance);
		jsonRequest.put("withdrawalBankCode", withdrawalBankCode);
		jsonRequest.put("withdrawalAccountNo", withdrawalAccountNo);
		jsonRequest.put("withdrawalTransactionSummary", "출금이체 계좌");

		System.out.println(depositBankCode);
		System.out.println(depositAccountNo);
		System.out.println(transactionBalance);
		System.out.println(withdrawalBankCode);
		System.out.println(withdrawalAccountNo);
		System.out.println(userKey);

		HttpEntity<String> entity = new HttpEntity<>(jsonRequest.toString(), headers);
		try {
			restTemplate.exchange(
				TRANSFER_ACCOUNT_URL,
				HttpMethod.POST,
				entity,
				TransferAccountResponse.class
			);
		} catch (HttpClientErrorException e) {
			sendErrorCode(e.getResponseBodyAsString());
		}

	}

	// 계좌 생성
	public ResponseEntity<OpenAccountRes> openAccount(String userKey, String accountTypeUniqueNo) {
		Map<String, String> body = new HashMap<>();
		body.put("apiName", "receivedTransferAccountNumber");
		body.put("transmissionDate", "20240101");
		body.put("transmissionTime", "121212");
		body.put("institutionCode", "00100");
		body.put("fintechAppNo", "001");
		body.put("apiServiceCode", "receivedTransferAccountNumber");
		body.put("institutionTransactionUniqueNo", createRandomNumber());
		body.put("apiKey", API_KEY);
		body.put("userKey", userKey);

		JSONObject jsonRequest = new JSONObject();
		jsonRequest.put("Header", body);
		jsonRequest.put("accountTypeUniqueNo", accountTypeUniqueNo);

		HttpEntity<String> entity = new HttpEntity<>(jsonRequest.toString(), headers);
		ResponseEntity<OpenAccountRes> bankResponse = null;
		try {
			bankResponse = restTemplate.exchange(
				OPEN_ACCOUNT_URL,
				HttpMethod.POST,
				entity,
				OpenAccountRes.class
			);
		} catch (HttpClientErrorException e) {
			sendErrorCode(e.getResponseBodyAsString());
		}
		return bankResponse;
	}

	public void sendErrorCode(String responseBody) {

		ObjectMapper objectMapper = new ObjectMapper();
		try {

			ErrorResponse errorResponse = objectMapper.readValue(responseBody, ErrorResponse.class);
			log.error(errorResponse.getResponseMessage());
			String errorMessage = switch (errorResponse.getResponseCode()) {
				case "A1003" -> "존재하지 않는 계좌입니다";
				case "H1007" -> "기관거래고유번호가 중복된 값입니다";
				case "A1014" -> " 계좌 잔액이 부족하여 거래가 실패했습니다.";
				default -> "에러 발생";
			};
			throw new RuntimeException(errorMessage);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("잘못된 데이터 형식");
		}
	}

	public String createRandomNumber() {
		Random random = new Random();
		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < 20; i++) {
			int number = random.nextInt(9);
			sb.append(number);
		}
		return sb.toString();
	}

}
