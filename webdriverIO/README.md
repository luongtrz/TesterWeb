# 🧪 WebdriverIO Demo – Helpdesk Tickets

Demo **tự động kiểm thử giao diện (E2E)** bằng **WebdriverIO + Chromedriver Service**.  
Ứng dụng mẫu: **Helpdesk Tickets Dashboard** (login → xem KPI → lọc → resolve ticket).

---

## 1️⃣ Cài đặt môi trường

```bash
# Đặt registry chuẩn
npm config set registry https://registry.npmjs.org/

# Dọn môi trường cũ (nếu có)
rm -rf node_modules package-lock.json
npm pkg delete devDependencies['@wdio/chromedriver-service'] || true

# Cài dependency WebdriverIO + Chromedriver service
npm i -D @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter        wdio-chromedriver-service chromedriver http-server start-server-and-test
```

> 🔹 **Không dùng** `@wdio/chromedriver-service` (package cũ, không tồn tại).  
> 🔹 Bạn cần có **Google Chrome** sẵn trong máy/container:
> ```bash
> apt-get update && apt-get install -y google-chrome-stable
> ```
> 🔹 Đảm bảo **phiên bản trùng nhau**:
> ```bash
> google-chrome --version
> npx chromedriver --version
> ```
> Ví dụ cùng là **141.x.x** ✅

---

## 2️⃣ Cấu trúc thư mục

```
mini-tickets-wdio/
│
├── index.html                  # Web demo (Tailwind + JS)
├── tickets.json                # Dữ liệu ticket mẫu
│
├── wdio.conf.js                # Cấu hình WebdriverIO
├── package.json
│
└── test/
    └── specs/
        ├── login.e2e.js
        └── tickets.dashboard.e2e.js
```

---

## 3️⃣ Scripts trong package.json

```json
"scripts": {
  "start": "http-server -p 5175 .",
  "wdio": "wdio run wdio.conf.js",
  "test": "start-server-and-test start http://localhost:5175 wdio"
}
```

- `npm run start` → chạy web tĩnh trên port `5175`.  
- `npm run wdio` → chạy test (yêu cầu web đang mở).  
- `npm test` → tự start web + chạy test, sau đó tự stop server.

---

## 4️⃣ Cấu hình WDIO mẫu (`wdio.conf.js`)

```js
const { join } = require('node:path');

/** @type {import('@wdio/types').Config} */
exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/usr/bin/google-chrome-stable',  // đường dẫn Chrome trong Linux
      args: ['--headless=new','--no-sandbox','--disable-gpu','--window-size=1280,800']
    }
  }],
  logLevel: 'info',
  baseUrl: 'http://localhost:5175',
  waitforTimeout: 10000,
  framework: 'mocha',
  reporters: ['spec'],
  services: ['chromedriver'],                   // ✅ dùng chromedriver service
  mochaOpts: { ui: 'bdd', timeout: 60000 },
  outputDir: join(__dirname, 'wdio-logs')
};
```

---

## 5️⃣ Chạy thử

```bash
npm test
```

- Server web: [http://localhost:5175](http://localhost:5175)  
- WDIO chạy Chrome headless.  
- Log lưu trong thư mục `./wdio-logs/`.

---

## 6️⃣ Test đơn lẻ

```bash
npx wdio run wdio.conf.js --spec test/specs/login.e2e.js
npx wdio run wdio.conf.js --spec test/specs/tickets.dashboard.e2e.js
```

---

## 7️⃣ Gây lỗi thử (test fail)

Trong `tickets.dashboard.e2e.js`, sửa dòng:

```js
await expect($('#kpiProgress')).toHaveText('1');
```

thành:

```js
await expect($('#kpiProgress')).toHaveText('9999999999999');
```

Sau đó chạy lại:
```bash
npm test
```

→ Bạn sẽ thấy WDIO in lỗi với diff rõ ràng giữa expected vs actual.

---

## 8️⃣ Ghi chú thêm

| Nội dung | Ghi chú |
|-----------|---------|
| Browser | Chrome headless (141.x) |
| Driver | Chromedriver 141 (npm package) |
| Không cần Java | Vì dùng Chromedriver Service, không dùng Selenium Standalone |
| Gỡ headless để thấy UI | Xóa `--headless=new` trong `wdio.conf.js` |
| Nếu chạy trong Docker | Dùng image base có `google-chrome-stable` hoặc thêm đoạn `apt install` ở trên |

---

✅ Sau khi cài đúng `chromedriver` và Chrome cùng major version, chỉ cần `npm test` là chạy được toàn bộ như log bạn đã có.
