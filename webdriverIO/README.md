# 🧪 WebdriverIO Demo – Helpdesk Tickets

> **Demo tự động kiểm thử E2E cho web Helpdesk Tickets Dashboard bằng WebdriverIO + Chromedriver Service.**
>
> - Đăng nhập → xem KPI → lọc → resolve ticket.
> - Test chạy trên Chrome headless, không cần Java/Selenium.
>
---

## 1 Chuẩn bị môi trường

**Yêu cầu:**
- Node.js >= 18
- Google Chrome (cài sẵn trên máy hoặc container)

```bash
# Đặt registry chuẩn (nếu cần)
npm config set registry https://registry.npmjs.org/

# Dọn môi trường cũ (nếu có)
rm -rf node_modules package-lock.json

# Cài dependencies
npm install
```

**Cài Chrome trên Linux:**
```bash
sudo apt-get update && sudo apt-get install -y google-chrome-stable
```

**Kiểm tra phiên bản:**
```bash
google-chrome --version
npx chromedriver --version
```
> Đảm bảo cùng major version (ví dụ đều là 141.x.x)

---

## 2 Cấu trúc thư mục

```
webdriverIO/
│
├── index.html                  # Web demo (Tailwind + JS)
├── tickets.json                # Dữ liệu ticket mẫu
├── wdio.conf.js                # Cấu hình WebdriverIO
├── package.json
│
└── test/
    └── specs/
        ├── login.e2e.js
        └── tickets.dashboard.e2e.js
```

---

## 3 Scripts trong package.json

```json
"scripts": {
  "start": "http-server -p 5175 .",
  "wdio": "wdio run wdio.conf.js",
  "test": "start-server-and-test start http://localhost:5175 wdio || true"
}
```

- `npm run start` → chạy web tĩnh trên port `5175`.
- `npm run wdio` → chạy test (yêu cầu web đang mở).
- `npm test` → tự start web + chạy test, sau đó tự stop server.

---

## 4 Cấu hình WDIO mẫu (`wdio.conf.js`)

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
      args: ['--headless=new','--no-sandbox','--disable-gpu','--window-size=1280,800']
    }
  }],
  logLevel: 'info',
  baseUrl: 'http://localhost:5175',
  waitforTimeout: 10000,
  framework: 'mocha',
  reporters: [
    'spec',
    ['html-nice', {
      outputDir: './wdio-report',
      filename: 'report.html',
      reportTitle: 'WebdriverIO Demo Report'
    }]
  ],
  services: ['chromedriver'],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
  outputDir: join(__dirname, 'wdio-logs')
};
```

---

## 5 Chạy test tự động

```bash
npm test
```

- Server web: [http://localhost:5175](http://localhost:5175)
- WDIO chạy Chrome headless.
- Log lưu trong thư mục `./wdio-logs/`.
- Báo cáo HTML: `./wdio-report/report.html`

---

## 6 Test đơn lẻ

```bash
npx wdio run wdio.conf.js --spec test/specs/login.e2e.js
npx wdio run wdio.conf.js --spec test/specs/tickets.dashboard.e2e.js
```

---

## 7 Gây lỗi thử (test fail)

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

→ WDIO sẽ in lỗi với diff rõ ràng giữa expected vs actual.

---

## 8️ Ghi chú thêm

| Nội dung | Ghi chú |
|-----------|---------|
| Browser | Chrome headless (141.x) |
| Driver | Chromedriver 141 (npm package) |
| Không cần Java | Dùng Chromedriver Service, không dùng Selenium Standalone |
| Gỡ headless để thấy UI | Xóa `--headless=new` trong `wdio.conf.js` |
| Nếu chạy trong Docker | Dùng image base có `google-chrome-stable` hoặc thêm đoạn `apt install` ở trên |

---

Sau khi cài đúng `chromedriver` và Chrome cùng major version, chỉ cần `npm test` là chạy được toàn bộ như log bạn đã có.
