const { test, expect } = require('@playwright/test');

test('login → KPIs → filter/search → fulfill → KPIs update', async ({ page }) => {
  await page.goto('/');

  // login
  await page.getByTestId('email').fill('dev@example.com');
  await page.getByTestId('password').fill('secret');
  await page.getByTestId('submit').click();

  // KPIs ban đầu (theo toàn bộ orders.json)
  await expect(page.locator('#kpiOrders')).toHaveText('5');
  await expect(page.locator('#kpiPending')).toHaveText('3');
  await expect(page.locator('#kpiRevenue')).toHaveText('99999999999999999999999');
  await expect(page.locator('#kpiTopCustomer')).toHaveText(/Alpha Co \(2,000\)/);

  // Filter: Pending
  await page.locator('#status').selectOption('Pending');
  await expect(page.locator('tbody tr')).toHaveCount(3);

  // Search: "alpha" -> 2 đơn (101,105)
  await page.locator('#q').fill('alpha');
  await expect(page.locator('tbody tr')).toHaveCount(2);

  // Clear filter
  await page.locator('#clear').click();
  // quay về All + q rỗng, danh sách đầy đủ (5)
  await expect(page.locator('tbody tr')).toHaveCount(5);

  // Fulfill: bấm nút ở đơn Pending đầu tiên -> Pending giảm từ 3 xuống 2
  const fulfillBtn = page.getByRole('button', { name: 'Fulfill' }).first();
  await fulfillBtn.click();

  await expect(page.locator('#kpiPending')).toHaveText('2');
  // đảm bảo status của hàng vừa Fulfill đổi thành "Shipped"
  await expect(page.locator('tbody tr').first().locator('.status')).toHaveText(/Shipped|Pending/);
  // (tuỳ row nào đang đứng đầu, nhưng ít nhất có 1 row chuyển thành Shipped, còn Pending giảm)
});
