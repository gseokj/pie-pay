package com.pay.pie.global.util;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class S3Util {

	private final List<String> ALLOWED_EXTENSIONLIST = Arrays.asList("jpg", "jpeg", "png", "gif");

	private final AmazonS3 amazonS3;

	@Value(value = "${cloud.aws.s3.bucket}")
	private String bucketName;

	public String upload(MultipartFile image) {

		if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) {
			throw new AmazonS3Exception("올릴 수 X");
		}
		String originalFileName = image.getOriginalFilename();
		String extension = validateImageFileExtension(originalFileName);
		String changedName = changedImageName(originalFileName);

		return uploadImage(image, extension, changedName);
	}

	private String uploadImage(MultipartFile image, String extension, String changedName) {

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType("image/" + extension);

		try {
			amazonS3.putObject(
				new PutObjectRequest(bucketName, changedName, image.getInputStream(), objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new RuntimeException("하하");
		}
		return amazonS3.getUrl(bucketName, changedName).toString();
	}

	private String validateImageFileExtension(String fileName) {
		int lastDotIndex = fileName.lastIndexOf(".");
		if (lastDotIndex == -1) {
			throw new AmazonS3Exception("올바를 파일 형식이 아닙니다");
		}

		String extension = fileName.substring(lastDotIndex + 1).toUpperCase();
		if (ALLOWED_EXTENSIONLIST.contains(extension)) {
			throw new AmazonS3Exception("지원 하는 파일 형식 X");
		}

		return extension;
	}

	private String changedImageName(String objectName) {
		String random = UUID.randomUUID().toString();
		return random + objectName;
	}
}
