package com.pay.pie.domain.meet.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "meet")
public class Meet {
	@Id
	@Column(name = "meet_id", nullable = false)
	private Long id;

	@Size(max = 50)
	@NotNull
	@Column(name = "meet_name", nullable = false, length = 50)
	private String meetName;

	@Size(max = 200)
	@Column(name = "meet_image", length = 200)
	private String meetImage;
}