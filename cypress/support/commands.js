// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//


// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => { 
    cy.request({
        url: "http://tallyai.us-east-1.elasticbeanstalk.com/api/auth/login",
        method:"POST",
        body:{
            email,password
        }
    })
    .then(res =>{
        expect(res.status).to.eq(200);
        window.localStorage.setItem("token", res.body.token)
        window.localStorage.setItem("userID", res.body.id)
        console.log(res)
    })
    cy.visit("/dashboard")
 })

 Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
