describe('Google', () => {
    beforeEach(() => {
        cy.visit('/Login')
    })
it('it clicks the Google Login Button',() => {
    cy.get('.googleBtn').click()
})
})