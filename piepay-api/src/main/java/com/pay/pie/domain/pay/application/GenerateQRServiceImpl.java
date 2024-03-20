package com.pay.pie.domain.pay.application;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class GenerateQRServiceImpl implements GenerateQRService {

	@Override
	@Transactional(readOnly = true)
	public byte[] generateQRCode(Long payId) throws WriterException, IOException {

		String url = "https://___/your-receipt/" + payId;
		int width = 200;
		int height = 200;
		BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		MatrixToImageWriter.writeToStream(bitMatrix, "PNG", out);
		// log.info("out: {}", out);
		return out.toByteArray();
		// return new byte[0];
	}
}
