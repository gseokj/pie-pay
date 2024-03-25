package com.pay.pie.domain.store.entity;

import com.pay.pie.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Table(name = "store")
// @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Store extends BaseEntity {

	public enum StoreCategory {
		FOOD, LEISURE, TRANSPORT
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "store_id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "store_name", nullable = false, length = 20)
	private String storeName;

	@Size(max = 100)
	@NotNull
	@Column(name = "account_number", nullable = false, length = 100)
	private String accountNumber;

	@Size(max = 50)
	@NotNull
	@Column(name = "address", nullable = false, length = 50)
	private String address;

	@Size(max = 20)
	@NotNull
	@Column(name = "phone", nullable = false, length = 20)
	private String phone;

	@NotNull
	@Column(name = "store_category", nullable = false)
	@Enumerated(EnumType.STRING)
	private Store.StoreCategory storeCategory;
}