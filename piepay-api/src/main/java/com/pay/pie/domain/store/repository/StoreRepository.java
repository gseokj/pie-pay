package com.pay.pie.domain.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pay.pie.domain.store.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
