describe('Form', () => {
    beforeEach(() => {
      cy.visit('/Register')
    })
  
    it('it focuses the input', () => {
      cy.focused().should('have.id', 'firstName')
    })
    it('accepts first name input', () => {
        const firstName = "First Name"
        cy.get('#firstName')
          .type(firstName)
          .should('have.value', firstName)
      })
      it('accepts last name input', () => {
          const lastName = "Last Name"
          cy.get('#lastName')
          .type(lastName)
          .should('have.value', lastName)
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
