describe('Form', () => {
    beforeEach(() => {
      cy.visit('/Register')
    })
  
    it('it focuses the input', () => {
      cy.focused().should('have.id', 'firstName')
    })
    it('accepts input', () => {
        const input = "First Name"
        cy.get('#firstName')
          .type(input)
          .should('have.value', input)
      })
      it('accepts another input', () => {
          const input2 = "Last Name"
          cy.get('#lastName')
          .type(input2)
          .should('have.value', input2)
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
    it('accepts confirm password', () => {
        const confirmPassword = "123456789"
        cy.get('#confirmedPassword')
        .type(confirmPassword)
        .should('have.value', confirmPassword)
    })
  })
