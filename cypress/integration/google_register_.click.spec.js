describe('Google', () => {
    beforeEach(() => {
        cy.visit('/Register')
    })
it('it clicks the Google Register button',() => {
    cy.get('.googleBtn').click()
})
})