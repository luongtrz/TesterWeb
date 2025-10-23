describe('Dashboard & Products (protected)', () => {
  it('login → xem KPIs → filter → add to cart', () => {
    cy.visit('/');

    // login UI
    cy.get('[data-testid=email]').type('dev@example.com');
    cy.get('[data-testid=password]').type('secret');
    cy.get('[data-testid=submit]').click();

    // KPIs
    cy.contains('#kpiProducts', '4').should('be.visible');
    cy.contains('#kpiStock', '135').should('be.visible');
    cy.contains('#kpiValue', '13,500').should('be.visible');
    cy.contains('#kpiTopCat', 'Electronics (105)').should('be.visible');

    // Filter
    cy.get('#q').type('desk');
    cy.get('tbody tr').should('have.length', 1).first().contains('Desk');

    // Clear + Add to cart
    cy.get('#clear').click();
    cy.contains('button', 'Add to cart').first().click();
    cy.contains('button', 'Add to cart').eq(1).click();
    cy.contains('#cartCount', '2').should('be.visible');

    // Logout → quay lại màn login
    cy.get('#btnLogout').click();
    cy.contains('h2', 'Đăng nhập').should('be.visible');
  });
});
