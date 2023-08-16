describe('Mario Memory Game', () => {
  it('should load the game', () => {
    cy.visit('http://localhost:3000/mario-memory');
    cy.contains('0 moves').should('be.visible');
    cy.get('button.controller-button').should('be.visible');
  });
});

