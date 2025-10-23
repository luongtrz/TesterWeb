beforeEach(async () => {
  await browser.url('/');
  await browser.execute(() => { localStorage.clear(); });
  await browser.refresh();
});

describe('Login', () => {
  it('đăng nhập thành công và thấy dashboard', async () => {
    await browser.url('/');
    await $('[data-testid="email"]').setValue('dev@example.com');
    await $('[data-testid="password"]').setValue('secret');
    await $('[data-testid="submit"]').click();

    await expect($('h2=Dashboard')).toBeDisplayed();
    await expect($('#btnLogout')).toBeDisplayed();
  });

  it('đăng nhập sai hiển thị lỗi', async () => {
    await browser.url('/');
    await $('[data-testid="email"]').setValue('wrong@example.com');
    await $('[data-testid="password"]').setValue('oops');
    await $('[data-testid="submit"]').click();

    await expect($('#loginMsg')).toHaveTextContaining('Sai tài khoản hoặc mật khẩu');
  });
});
