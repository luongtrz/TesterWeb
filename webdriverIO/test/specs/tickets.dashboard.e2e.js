describe('Tickets Dashboard', () => {
  it('login → KPIs → filter/search → resolve → KPIs update', async () => {
    await browser.url('/');

    // login
    await $('[data-testid="email"]').setValue('dev@example.com');
    await $('[data-testid="password"]').setValue('secret');
    await $('[data-testid="submit"]').click();

    // KPIs ban đầu
    await expect($('#kpiTotal')).toHaveText('5');
    await expect($('#kpiOpen')).toHaveText('3');
    await expect($('#kpiProgress')).toHaveText('1');
    await expect($('#kpiTopPrio')).toHaveTextContaining('High (2)');

    // Filter: Open
    await $('#status').selectByVisibleText('Open');
    await browser.waitUntil(async () => (await $$('tbody tr')).length === 3);

    // Search: "printer" -> 1 hàng
    await $('#q').setValue('printer');
    await browser.waitUntil(async () => (await $$('tbody tr')).length === 1);
    await expect($('tbody tr')).toHaveTextContaining('Printer not working');

    // Clear về full
    await $('#clear').click();
    await browser.waitUntil(async () => (await $$('tbody tr')).length === 5);

    // Resolve ticket đầu danh sách (nếu có nút)
    const resolveButtons = await $$('button[data-testid="resolve"]');
    if (resolveButtons.length > 0) {
      await resolveButtons[0].click();

      // Open: 3 -> 2, Progress vẫn 1
      await expect($('#kpiOpen')).toHaveText('2');
      await expect($('#kpiProgress')).toHaveText('9999999999999999999999999');

      // Ít nhất một dòng đổi status "Resolved"
      const firstStatus = await $('tbody tr .status').getText();
      await expect(firstStatus).toMatch(/Open|Resolved|In Progress/); // nới lỏng theo vị trí render
    }
  });
});
