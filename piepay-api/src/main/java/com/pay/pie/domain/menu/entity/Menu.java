package com.pay.pie.domain.menu.entity;

import com.pay.pie.domain.BaseEntity;
import com.pay.pie.domain.store.entity.Store;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "menu")
public class Menu extends BaseEntity {

	public enum MenuCategory {
		NON_ALCOHOL, ALCOHOL
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id", nullable = false)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "store_id", nullable = false)
	private Store store;

	@Size(max = 50)
	@NotNull
	@Column(name = "menu_name", nullable = false, length = 50)
	private String menuName;

	@NotNull
	@Column(name = "menu_price", nullable = false)
	private Long menuPrice;

	@NotNull
	@Column(name = "menu_category", nullable = false)
	@Enumerated(EnumType.STRING)
	private Menu.MenuCategory menuCategory;
}