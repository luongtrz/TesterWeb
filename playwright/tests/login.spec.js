const { test, expect } = require('@playwright/test');

test.describe('Login', () => {
  test('đăng nhập thành công và thấy dashboard', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('email').fill('dev@example.com');
    await page.getByTestId('password').fill('secret');
    await page.getByTestId('submit').click();

    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(page.locator('#btnLogout')).toBeVisible();
  });

  test('đăng nhập sai hiển thị lỗi', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('email').fill('wrong@example.com');
    await page.getByTestId('password').fill('oops');
    await page.getByTestId('submit').click();

    await expect(page.locator('#loginMsg')).toHaveText(/sai tài khoản hoặc mật khẩu/i);
  });
});
