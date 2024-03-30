package com.pay.pie.domain.order.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.menu.repository.MenuRepository;
import com.pay.pie.domain.order.dao.OrderRepository;
import com.pay.pie.domain.order.dto.response.OrderResponse;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.order.service.OrderService;
import com.pay.pie.domain.orderMenu.dto.AddOrderMenuRequest;
import com.pay.pie.domain.orderMenu.dto.NewOrderMenuResponse;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.orderMenu.repository.OrderMenuRepository;
import com.pay.pie.domain.orderMenu.service.OrderMenuService;
import com.pay.pie.domain.store.entity.Store;
import com.pay.pie.domain.store.repository.StoreRepository;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class OrderApiController {

	private final OrderService orderService;
	private final OrderMenuService orderMenuService;
	private final MenuRepository menuRepository;
	private final StoreRepository storeRepository;
	private final OrderMenuRepository orderMenuRepository;
	private final OrderRepository orderRepository;

	@PreAuthorize("hasAnyRole('ROLE_CERTIFIED')")
	@PostMapping("/your-receipt/{payId}")
	public ResponseEntity<BaseResponse<OrderResponse>> addReceipt(@PathVariable Long payId) {
		Order order = orderService.save(payId);
		Long orderId = order.getId();

		// List<Store> stores = storeRepository.findAll();
		Random random = new Random();
		// int randomIndex = random.nextInt(stores.size());
		// Store store = stores.get(randomIndex);

		Store store = order.getStore();

		List<Menu> menus = menuRepository.findAllByStore(store);
		List<NewOrderMenuResponse> orderMenus = new ArrayList<>();
		int menuConsumed = random.nextInt(6) + 4;
		long totalAmount = 0L; // 총액을 초기화합니다.

		for (int i = 0; i < menuConsumed; i++) {
			int menuId = random.nextInt(menus.size());
			int menuAmount = random.nextInt(3) + 1;
			Menu menu = menus.get(menuId);
			// OrderMenu 생성 및 저장
			OrderMenu orderMenu = new OrderMenu();
			// Order order = orderRepository.findById(orderId).orElseGet(null);
			orderMenu = orderMenuRepository.findByMenuAndOrder(menu, order);

			if (orderMenu == null) {
				AddOrderMenuRequest addOrderMenuRequest = new AddOrderMenuRequest();
				addOrderMenuRequest.setMenu(menu);
				addOrderMenuRequest.setOrder(order);
				addOrderMenuRequest.setQuantity(menuAmount);

				OrderMenu savedOrderMenu = orderMenuService.save(addOrderMenuRequest);
				orderMenus.add(new NewOrderMenuResponse(savedOrderMenu));

				long subtotal = menu.getMenuPrice() * menuAmount;
				totalAmount += subtotal;
			}
		}

		order.setTotalAmount(totalAmount);
		orderService.save(payId); // 주문을 저장합니다.

		return BaseResponse.success(
			SuccessCode.INSERT_SUCCESS,
			new OrderResponse(order, orderMenus));
	}
}
