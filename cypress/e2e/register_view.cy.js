
describe('Redirecionamento para /login a partir de /register', () => {
  it('Deve redirecionar para /login ao clicar em Login in', () => {
    cy.visit('/register');
    
    cy.contains('span', 'Login in').click();
    
    cy.url().should('include', '/login');
  })
})

// TODO: Testar se o botão fica disabled quando os inputs não estão válidos.
describe('Testar registro de um novo usuário com credenciais inválidas.', () => {
  it('Deve exibir uma mensagem de erro caso tente registrar um usuário com "Username" já utilizado.', () => {
    
    cy.register('Teste', 'Teste', 'gustavo', 'gustavo@mail.com', 'Senha@123', 'Senha@123');
  
    cy.contains('The username is already taken.').should('be.visible');
  })
  
  it('Deve exibir uma mensagem de erro caso tente registrar um usuário com "E-mail" já utilizado.', () => {
    
    cy.register('Teste', 'Teste', 'test', 'gustavo@mail.com', 'Senha@123', 'Senha@123');
  
    cy.contains('The e-mail is already taken.').should('be.visible');
  })
  
  it('Deve exibir uma mensagem de erro caso tente registrar um usuário com "Password" e "Confirm Password" diferentes.', () => {
    
    cy.register('Teste', 'Teste', 'test', 'test@mail.com', 'Senha@12', 'Senha@123');
  
    cy.contains('The password confirmation does not match.').should('be.visible');
  })

  it('Deve exibir uma mensagem de erro caso tente registrar um usuário com "Firstname" inválido ou "Lastname" inválido.', () => {
    cy.register('Teste2', 'Teste2', 'test', 'test@mail.com', 'Senha@123', 'Senha@123');
  }) // TODO: PASSOU! CONSERTAR ISSO...
})

describe('Testar registro de um novo usuário com credenciais válidas.', () => {
})