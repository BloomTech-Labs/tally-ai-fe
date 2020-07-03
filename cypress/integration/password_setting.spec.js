describe("Password Settings", ()=>{
    before(()=>{
        
        cy.login("testaccount@test.com","testAccount")
    });

    it("should visit password",()=>{
        
        cy.visit("/settings")
        cy.url().should("contain","/settings");
        cy.get('button[id="vertical-tab-1"').click()
        cy.contains("New Password").should("exist")
        cy.contains("Confirm Password").should("exist")
    });

    it("should type password, ",()=>{
        cy.get("#password").type("testAccount").should("have.value", "testAccount")
        cy.get("#confirmPassword").type("testAccount").should("have.value", "testAccount")
    })

    it("should have submit button", ()=>{
        cy.get('button[data-testid="password-settings"]').click({force: true});
    })

})