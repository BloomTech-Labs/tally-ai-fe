describe("Account Settings", ()=>{
    before(()=>{
        
        cy.login("adrian-parra@lambdastudents.com","Fluffy342")
    });

    it("should update nav bar", ()=>{
        cy.window().its("store").invoke("getState").should('be.empty')
    })

    it("should select setting tab",()=>{
        cy.url().should("contain","/dashboard");
    });

})