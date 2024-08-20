Cypress.Commands.add('login', (username, password) => {
  // TODO: implementar .session()

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

Cypress.Commands.add('register',
  (firstName, lastName, username, email, password, confirmPassword) => {

    cy.visit('/register');

    cy.url().should('include', '/register');
  
    cy.get('input[placeholder="First Name"]')
      .type(firstName)
      .should('have.value', firstName);
      
    cy.get('input[placeholder="Last Name"]')
      .type(lastName)
      .should('have.value', lastName);
    
    cy.get('input[placeholder="Username"]')
      .type(username)
      .should('have.value', username);

    cy.get('input[placeholder="E-mail"]')
      .type(email)
      .should('have.value', email);
    
    cy.get('input[placeholder="Password"]')
      .type(password)
      .should('have.value', password);
    
    cy.get('input[placeholder="Confirm Password"]')
      .type(confirmPassword)
      .should('have.value', confirmPassword);
    
    cy.contains('button', 'Register').click(); // TODO: Testar as Responses (É necessário, ou isso seria responsabilidade do testes do backend)
  }
)