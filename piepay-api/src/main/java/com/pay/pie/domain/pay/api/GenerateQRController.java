package com.pay.pie.domain.pay.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.application.RedisToDBSyncService;
import com.pay.pie.domain.pay.application.GenerateQRService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/pay/qr")
@RequiredArgsConstructor
public class GenerateQRController {

	private final GenerateQRService generateQRService;
	private final RedisToDBSyncService redisToDBSyncService;

	/**
	 * QR코드 생성
	 * @param payId 결제ID
	 * @return QR코드 png
	 */
	@GetMapping
	public ResponseEntity<byte[]> generateQRCode(@RequestParam Long payId) {
		// redis -> DB
		// redisToDBSyncService.syncDataFromRedisToDB(payId);

		try {
			byte[] qrCodeimage = generateQRService.generateQRCode(payId);
			return ResponseEntity.ok()
				.contentType(MediaType.IMAGE_PNG)
				.body(qrCodeimage);
		} catch (Exception e) {
			log.warn("QR Code OutputStream 도중 Exception 발생, {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
