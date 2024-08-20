Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');

  // Inserindo as credenciais de Login
  cy.get('input[placeholder="Username"]')
    .type(username)
    .should('have.value', username);

  cy.get('input[placeholder="Password"]')
    .type(password)
    .should('have.value', password);

  // Clicando no Botao de Login
  cy.contains('button', 'Login').click();
})