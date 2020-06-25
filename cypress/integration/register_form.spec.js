describe('Form', () => {
    beforeEach(() => {
      cy.visit('/Register')
    })
  
    it('it focuses the input', () => {
      cy.focused().should('have.id', 'first_name')
    })
    it('accepts first name input', () => {
        const first_name = "First Name"
        cy.get('#first_name')
          .type(first_name)
          .should('have.value', first_name)
      })
      it('accepts last name input', () => {
          const last_name = "Last Name"
          cy.get('#last_name')
          .type(last_name)
          .should('have.value', last_name)
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
    it('Clicks Submit',() => {
      cy.get('form').submit()
    })
    
  })
