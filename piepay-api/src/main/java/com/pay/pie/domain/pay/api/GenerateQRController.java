package com.pay.pie.domain.pay.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.pay.application.GenerateQRService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/pay/qr")
@RequiredArgsConstructor
public class GenerateQRController {

	private final GenerateQRService generateQRService;

	/**
	 * QR코드 생성
	 * @param payId 결제ID
	 * @return QR코드 png
	 */
	@GetMapping
	public ResponseEntity<byte[]> generateQRCode(@RequestParam Long payId) {

		try {
			byte[] qrCodeimage = generateQRService.generateQRCode(payId);
			return ResponseEntity.ok()
				.contentType(MediaType.IMAGE_PNG)
				.body(qrCodeimage);
		} catch (Exception e) {
			log.warn("QR Code OutputStream 도중 Exception 발생, {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		// String url = "https://___/your-receipt/" + payId;
		// int width = 200;
		// int height = 200;
		// BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);
		//
		// try {
		// 	ByteArrayOutputStream out = new ByteArrayOutputStream();
		// 	MatrixToImageWriter.writeToStream(bitMatrix, "PNG", out);
		// 	log.info("out: {}", out);
		//
		// 	return ResponseEntity.ok()
		// 		.contentType(MediaType.IMAGE_PNG)
		// 		.body(out.toByteArray());
		// } catch (Exception e) {
		// 	log.warn("QR Code OutputStream 도중 Exception 발생, {}", e.getMessage());
		// }
		// return null;

		// Map<EncodeHintType, ErrorCorrectionLevel> hints = new HashMap<>();
		// hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
		//
		// QRCodeWriter qrCodeWriter = new QRCodeWriter();
		// BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height, hints);
		//
		// BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		// image.createGraphics();
		//
		// Graphics2D graphics = (Graphics2D)image.getGraphics();
		// graphics.setColor(Color.WHITE);
		// graphics.fillRect(0, 0, width, height);
		// graphics.setColor(Color.BLACK);
		//
		// for (int i = 0; i < width; i++) {
		// 	for (int j = 0; j < height; j++) {
		// 		if (bitMatrix.get(i, j)) {
		// 			graphics.fillRect(i, j, 1, 1);
		// 		}
		// 	}
		// }
		//
		// OutputStream outputStream = response.getOutputStream();
		// ImageIO.write(image, url, outputStream);
		// outputStream.close();
	}

}
