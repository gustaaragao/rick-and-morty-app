describe('Redirecionamento para /login', () => {
  const endpoints = ['/characters', '/episodes', '/locations', '/profile', '/'];

  endpoints.forEach((endpoint) => {
    it(`Deve redirecionar para /login ao acessar ${endpoint}`, () => {
      cy.visit(endpoint, { failOnStatusCode: false });
      cy.url().should('include', '/login');
    });
  });
});

describe("Redirecionamento para /register a partir de /login", () => {
  it('Deve redirecionar para /register ao clicar em Sign up', () => {
    cy.visit('/login');

    cy.contains('span', 'Sign up').click();

    cy.url().should('include', '/register');
  })
})

// TODO: Será que precisamos criar um teste para a visualização da Senha no Password? Ou isso é responsabilidade de um teste no componente?

describe('Testar Autenticação do Login', () => {
  // TODO: Criar um usuario para testar o Login

  it("Deve permitir login com credenciais válidas", () => {
    cy.visit('/login');

    // Inserindo as credenciais de Login
    cy.get('input[placeholder="Username"]')
      .type('gustavo')
      .should('have.value', 'gustavo');
      
    cy.get('input[placeholder="Password"]')
      .type('Senha@123')
      .should('have.value', 'Senha@123');

    // Clicando no Botao de Login
    cy.contains('button', 'Login').click();
    
    cy.url().should('include', ''); // Assert: Foi redirecionado para '/'?

    // TODO: Testar se o usuário foi criado no localStorage
  })

  it("Deve exibir mensagem de erro com credenciais inválidas", () => {
    cy.visit('/login');

    cy.get('input[placeholder="Username"]')
      .type('testeErro')
      .should('have.value', 'testeErro');
    
    cy.get('input[placeholder="Password"]')
      .type('SenhaIncorreta@123')
      .should('have.value', 'SenhaIncorreta@123');

      cy.contains('button', 'Login').click();


      cy.contains("Incorrect Username or Password").should('be.visible');
  })
})