package com.pay.pie.domain.menu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.store.entity.Store;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	List<Menu> findAllByStore(Store store);
}
