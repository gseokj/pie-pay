package com.pay.pie.domain.pay.application;

import java.io.IOException;

import com.google.zxing.WriterException;

public interface GenerateQRService {
	byte[] generateQRCode(Long payId) throws WriterException, IOException;
}
