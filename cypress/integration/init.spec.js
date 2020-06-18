describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
    it('visits the app', () => {
        cy.visit('/')
      })
      it('visits login', () => {
          cy.visit('/Login')
      })
      it('visits register', () => {
        cy.visit('/Register')
    })
    it('visits about',() => {
        cy.visit('/About')
    })

   
  })
  