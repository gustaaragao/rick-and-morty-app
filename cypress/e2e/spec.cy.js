describe('My First Test', () => {
  it('click the link "type"', () => {
    // Triple A -> Arrange (Preparar o ambiente), Action (Ação), Assert (Verificar) 

    cy.visit("https://example.cypress.io"); // Arrange

    // Action
    cy.contains("type").click(); // .contains() -> Buscar o conteúdo dentro da página.
    // |-> Implicit Assertion: caso não encontrado em 4s (timeout), dispara um erro. 
    
    // Ao clicar no hyperlink "type", devemos acessar uma nova url
    // Fazemos uma Assertion em relação a isso.
    cy.url().should('include', '/commands/actions'); // Assert

    // .get() -> busca um ou + elementos de acordo com um select ou alias
    cy.get('.action-email')
      .type('fake@email.com') // .type(STRING) -> vai inserir a STRING no input
      .should('have.value', 'fake@email.com'); // Verifica se o valor está correto (se o update funcionou)
  })
})

/*
| -------------- |
| BEST PRACTICES |
| -------------- |

Referencia: https://docs.cypress.io/guides/references/best-practices#Selecting-Elements


*/