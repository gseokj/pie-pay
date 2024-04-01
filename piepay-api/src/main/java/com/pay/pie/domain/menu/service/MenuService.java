package com.pay.pie.domain.menu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.menu.repository.MenuRepository;
import com.pay.pie.domain.store.entity.Store;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor // final이 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service
public class MenuService {
	private final MenuRepository menuRepository;

	@Transactional
	public List<Menu> findAllByStore(Store store) {
		return menuRepository.findAllByStore(store);
	}
}
