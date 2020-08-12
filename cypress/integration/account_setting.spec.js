describe("Account Settings", ()=>{
    before(()=>{
        
        cy.login("testaccount@test.com","testAccount")
    });

    it("should visit Account settings",()=>{
        
        cy.visit("/settings")
        cy.url().should("contain","/settings");
        cy.contains("First Name").should("exist")
        cy.contains("Last Name").should("exist")
    });

    it("should type full name, ",()=>{
        cy.get("#firstName").clear().type("Account").should("have.value", "Account")
        cy.get("#lastName").clear().type("Test").should("have.value", "Test")
    })

    it("should have submit button", ()=>{
        cy.get('button[data-testid="account-settings"]').click({force: true});
    })

})