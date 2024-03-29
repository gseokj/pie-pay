package com.pay.pie.domain.store.dto;

import com.pay.pie.domain.store.entity.Store;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StoreInfoDto {

	private final String storeName;
	private final String address;
	private final String phone;

	public static StoreInfoDto of(Store store) {
		return StoreInfoDto.builder()
			.storeName(store.getStoreName())
			.address(store.getAddress())
			.phone(store.getPhone())
			.build();
	}
}
