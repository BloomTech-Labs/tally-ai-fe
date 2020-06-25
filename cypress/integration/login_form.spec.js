describe('Form', () => {
    beforeEach(() => {
      cy.visit('/Login')
    })
    it('it focuses the input', () => {
        cy.focused().should('have.id', 'email')
      })
      it('accepts email', () => {
        const email = "test123@test.com"
        cy.get('#email')
          .type(email)
          .should('have.value', email)
      })
      it('accepts password', () => {
        const password = "123456789"
        cy.get('#password')
          .type(password)
          .should('have.value', password)

          
      })
      it('Clicks Submit',() => {
        cy.get('form').submit()
      })
  })