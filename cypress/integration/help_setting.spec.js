describe("Password Settings", ()=>{
    before(()=>{
        
        cy.login("testaccount@test.com","testAccount")
    });

    it("should visit help",()=>{    
        cy.visit("/settings")
        cy.url().should("contain","/settings");
        cy.get('button[id="vertical-tab-2"').click()
        cy.contains("Contact Us").should("exist")
    });


})