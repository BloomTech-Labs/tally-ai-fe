describe('Form', () => {
    beforeEach(() => {
      cy.visit('/Register')
    })
  
    it('it focuses the input', () => {
      cy.focused().should('have.id', 'firstName')
    })
  })
