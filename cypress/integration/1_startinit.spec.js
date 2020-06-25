describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
    it('visits the app', () => {
        cy.visit('/')
        cy.contains("See what customers are saying about your business!")
       
      })
      it('visits login', () => {
          cy.visit('/Login')
          cy.contains("Email Address")
          cy.contains("Password")
      })
      it('visits register', () => {
        cy.visit('/Register')
    })
    it('visits about',() => {
        cy.visit('/About')
        cy.contains('Meet The Team')
        cy.contains('Web Developer')
    })

   
  })
  