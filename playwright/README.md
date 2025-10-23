# Playwright Demo – Product Dashboard

Demo kiểm thử giao diện bằng Playwright.
Ứng dụng mẫu: Product Dashboard (login → xem KPI → lọc → thêm vào giỏ).

---

## 1. Cài đặt môi trường

```bash
npm init -y
npm i -D @playwright/test http-server
```

---

## 2. Cấu trúc thư mục

```
playwright-demo/
│
├── index.html                # Web demo (Tailwind + JS)
├── products.json             # Dữ liệu sản phẩm mẫu
│
├── playwright.config.js      # Cấu hình Playwright
├── package.json
│
└── tests/
    ├── login.spec.js
    └── dashboard.products.spec.js
```

---

## 3. Phần scripts trong package.json

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
npm start      # chạy web demo ở http://localhost:5173
npm test       # chạy test headless
```

Playwright tự động tải trình duyệt cần thiết khi chạy lần đầu.

---

## 5. Mô tả ứng dụng mẫu

| Chức năng | Mô tả |
|------------|-------|
| Đăng nhập | dev@example.com / secret |
| Dashboard KPI | Hiển thị tổng sản phẩm, doanh số, trạng thái |
| Lọc sản phẩm | Tìm kiếm theo tên hoặc loại |
| Giỏ hàng | Thêm sản phẩm vào giỏ |

---

## 6. Gây lỗi thử (test fail)

Trong `dashboard.products.spec.js`, sửa một dòng như sau:

```js
await expect(page.getByText('Total Products: 10')).toBeVisible();
```

thành

```js
await expect(page.getByText('Total Products: 99')).toBeVisible();
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
