# Cypress Demo – Product Dashboard

Demo kiểm thử giao diện bằng Cypress.
Ứng dụng mẫu: Product Dashboard (login → xem KPI → lọc → thêm vào giỏ).

---


## 1. Cài đặt môi trường

**Yêu cầu:**
- Đã cài đặt [Node.js và npm](https://nodejs.org/) trên máy.
- Đã cài đặt trình duyệt Chrome (để chạy test headless).

**Cài đặt dependencies:**
```bash
npm init -y
npm install --save-dev cypress http-server
```

---

## 2. Cấu trúc thư mục

```
cypress-demo/
│
├── index.html                # Web demo (Tailwind + JS)
├── products.json             # Dữ liệu sản phẩm mẫu
│
├── cypress.config.js         # Cấu hình Cypress
├── package.json
│
└── cypress/
    └── e2e/
        ├── login.cy.js
        └── dashboard.products.cy.js
```

---


## 3. Scripts trong package.json

Thêm vào phần `scripts`:
```json
"scripts": {
  "start": "http-server -p 5174 .",
  "cy:open": "cypress open",
  "cy:run": "cypress run --browser chrome"
}
```

- `npm run cy:open`: Mở giao diện Cypress Test Runner.
- `npm run cy:run`: Chạy toàn bộ test headless trong Chrome.

---


## 4. Chạy thử

```bash
# Khởi động web demo
npm start       # Truy cập http://localhost:5174

# Mở giao diện test
npm run cy:open

# Chạy test headless
npm run cy:run
```

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

Trong `dashboard.products.cy.js`, sửa dòng:

```js
cy.contains('Total Products: 10').should('be.visible');
```

thành:

```js
cy.contains('Total Products: 99').should('be.visible');
```

Sau đó chạy `npm run cy:run` để xem test fail.

---


## 7. Báo cáo test

Sau khi chạy `cy:run`, Cypress sẽ lưu kết quả tại thư mục `cypress/reports` (nếu cấu hình thêm plugin reporter).
Bạn có thể thêm tuỳ chọn `--reporter html` để tạo báo cáo HTML:
```bash
npm run cy:run -- --reporter html
```

---

## 8. Ghi chú thêm

- Cypress chạy trực tiếp trên trình duyệt thực, tương tác DOM trực quan.
- Có thể thêm plugin quay video, screenshot, hoặc chạy trong CI/CD.
- Để bật debug log:
  ```bash
  DEBUG=cypress:* npm run cy:run
  ```
