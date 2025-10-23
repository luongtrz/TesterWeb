# Playwright Demo – Orders Dashboard

Demo kiểm thử giao diện bằng Playwright.
Ứng dụng mẫu: Orders Dashboard (login → xem KPI → lọc → thêm vào giỏ).

---

## 1. Cài đặt môi trường

```bash
npm init -y
npm i -D @playwright/test http-server
npx playwright install
```

---

## 2. Cấu trúc thư mục

```
playwright/
│
├── index.html                # Web demo (Tailwind + JS)
├── orders.json               # Dữ liệu đơn hàng mẫu
│
├── playwright.config.js      # Cấu hình Playwright
├── package.json
│
└── tests/
  ├── login.spec.js
  └── orders.dashboard.spec.js
```

---


## 3. Scripts trong package.json

```json
"scripts": {
  "start": "http-server -p 5173 .",
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "report": "playwright show-report"
}
```

Lệnh `npm test` sẽ chạy test ở chế độ headless.
Lệnh `npm run test:ui` chạy với giao diện tương tác.

---


## 4. Chạy thử

```bash
npm start         # chạy web demo ở http://localhost:5173
npm test          # chạy test headless
npm run test:ui   # chạy test với giao diện
```

Nếu chưa cài browser, chạy thêm:
```bash
npx playwright install
```

---


## 5. Mô tả ứng dụng mẫu

| Chức năng      | Mô tả                                    |
|----------------|------------------------------------------|
| Đăng nhập      | dev@example.com / secret                 |
| Dashboard KPI  | Hiển thị tổng đơn, doanh số, trạng thái  |
| Lọc đơn hàng   | Tìm kiếm theo tên khách hoặc trạng thái  |
| Giỏ hàng       | Thêm đơn vào giỏ (Fulfill)               |

---


## 6. Gây lỗi thử (test fail)

Trong `orders.dashboard.spec.js`, sửa một dòng như sau:

```js
await expect(page.locator('#kpiOrders')).toHaveText('5');
```

thành

```js
await expect(page.locator('#kpiOrders')).toHaveText('99');
```

Sau đó chạy `npm test` để xem kết quả lỗi.

---


## 7. Báo cáo test

Sau khi chạy test, tạo báo cáo HTML:

```bash
npm run report
```

Báo cáo mở tại địa chỉ: http://localhost:9323

---


## 8. Ghi chú thêm

- Playwright hỗ trợ Chromium, Firefox và WebKit.
- Có thể chạy test song song, hoặc cấu hình nhiều môi trường trong `playwright.config.js`.
- Nếu muốn test UI chi tiết, có thể bật chế độ headed bằng:
  ```bash
  npx playwright test --headed
  ```
