package com.pay.pie.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class S3Config {

	@Value(value = "${cloud.aws.credentials.access-key}")
	private String accessKey;

	@Value(value = "${cloud.aws.credentials.secret-key}")
	private String secretKey;

	@Value(value = "${cloud.aws.region.static}")
	private String region;

	@Bean
	public AmazonS3Client amazonS3Client() {
		BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

		return (AmazonS3Client)AmazonS3ClientBuilder
			.standard()
			.withRegion(region)
			.withCredentials(new AWSStaticCredentialsProvider(credentials))
			.build();
	}

}
