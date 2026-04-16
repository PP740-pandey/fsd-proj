package com.ecommerce.controller;

import com.ecommerce.entity.Order;
import com.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // POST /orders
    // Body: { "userId": 1, "productId": 2, "quantity": 3 }
    @PostMapping
    public Order placeOrder(@RequestBody Map<String, Integer> body) {
        return orderService.placeOrder(
                body.get("userId").longValue(),
                body.get("productId").longValue(),
                body.get("quantity")
        );
    }

    // GET /orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
