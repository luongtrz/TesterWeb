describe('Login', () => {
  it('đăng nhập thành công và thấy dashboard', () => {
    cy.visit('/');
    cy.get('[data-testid=email]').type('dev@example.com');
    cy.get('[data-testid=password]').type('secret');
    cy.get('[data-testid=submit]').click();

    cy.contains('h2', 'Dashboard').should('be.visible');
    cy.get('#btnLogout').should('be.visible');
  });

  it('đăng nhập sai hiển thị lỗi', () => {
    cy.visit('/');
    cy.get('[data-testid=email]').type('wrong@example.com');
    cy.get('[data-testid=password]').type('oops');
    cy.get('[data-testid=submit]').click();

    cy.contains('#loginMsg', 'Sai tài khoản hoặc mật khẩu').should('be.visible');
  });
});
