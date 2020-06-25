describe('clearCookies', () => {
    it('clears the cookies' , () => {
        cy.clearCookie('authId')
    })
});
