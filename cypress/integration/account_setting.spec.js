describe("Account Settings", ()=>{
    before(()=>{
        
        cy.login("adrian-parra@lambdastudents.com","Fluffy342")
    });

    it("should update nav bar", ()=>{
        cy.window().its("store").invoke("getState").should('exist')
        // cy.window().its("store").invoke("dispatch", {type: "UPDATE_LOGGED_IN_USER", payload: "true"})
    })

    it("should select setting tab",()=>{
        cy.url().should("contain","/dashboard");
    });

})