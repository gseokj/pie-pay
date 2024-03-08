package com.pay.pie.domain.store.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "store")
public class Store {
	@Id
	@Column(name = "store_id", nullable = false)
	private Long id;

	@Size(max = 20)
	@NotNull
	@Column(name = "store_name", nullable = false, length = 20)
	private String storeName;

	@Size(max = 100)
	@NotNull
	@Column(name = "account_number", nullable = false, length = 100)
	private String accountNumber;
}