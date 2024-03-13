package com.pay.pie.domain.pay.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/pay/qr")
@RequiredArgsConstructor
public class MakeQRController {

	@GetMapping
	public void generateQRCode(
		@RequestParam Long payId) throws WriterException, IOException {
		String url = "https://___/your-receipt";
		int width = 200;
		int height = 200;
		BitMatrix matrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);

		Map<EncodeHintType, ErrorCorrectionLevel> hints = new HashMap<>();
		hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);

		QRCodeWriter qrCodeWriter = new QRCodeWriter();
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
