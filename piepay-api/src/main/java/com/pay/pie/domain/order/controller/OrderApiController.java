package com.pay.pie.domain.order.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pay.pie.domain.menu.entity.Menu;
import com.pay.pie.domain.menu.service.MenuService;
import com.pay.pie.domain.order.dto.response.OrderResponse;
import com.pay.pie.domain.order.entity.Order;
import com.pay.pie.domain.order.service.OrderService;
import com.pay.pie.domain.orderMenu.dto.AddOrderMenuRequest;
import com.pay.pie.domain.orderMenu.dto.NewOrderMenuResponse;
import com.pay.pie.domain.orderMenu.entity.OrderMenu;
import com.pay.pie.domain.orderMenu.service.OrderMenuService;
import com.pay.pie.domain.store.entity.Store;
import com.pay.pie.global.common.BaseResponse;
import com.pay.pie.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController // HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
public class OrderApiController {

	private final OrderService orderService;
	private final OrderMenuService orderMenuService;
	private final MenuService menuService;

	@Transactional
	@GetMapping("/your-receipt/{payId}")
	public ResponseEntity<BaseResponse<OrderResponse>> addReceipt(@PathVariable Long payId) {
		// 발표용 코드
		long fakePayId;
		if (payId % 2 == 0) {
			fakePayId = 18L;
		} else {
			fakePayId = 55L;
		}
		/// 발표용 코드
		Order existedOrder = orderService.findByPayId(fakePayId);
		if (existedOrder != null) {
			Long orderId = existedOrder.getId();
			List<NewOrderMenuResponse> orderMenus = orderMenuService.findByOrderId(orderId)
				.stream()
				.map(NewOrderMenuResponse::new)
				.toList();

			return BaseResponse.success(
				SuccessCode.SELECT_SUCCESS,
				new OrderResponse(existedOrder, orderMenus));
		} else {
			Order order = orderService.save(payId);

			Random random = new Random();

			Store store = order.getStore();

			// List<Menu> menus = menuRepository.findAllByStore(store);
			List<Menu> menus = menuService.findAllByStore(store);
			List<NewOrderMenuResponse> orderMenus = new ArrayList<>();
			int menuConsumed = random.nextInt(6) + 4;
			long totalAmount = 0L; // 총액을 초기화합니다.

			for (int i = 0; i < menuConsumed; i++) {
				int menuId = random.nextInt(menus.size());
				int menuAmount = random.nextInt(3) + 1;
				Menu menu = menus.get(menuId);
				OrderMenu orderMenu = orderMenuService.findByMenuAndOrder(menu, order);

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

			return BaseResponse.success(
				SuccessCode.INSERT_SUCCESS,
				new OrderResponse(order, orderMenus));
		}
	}
}
