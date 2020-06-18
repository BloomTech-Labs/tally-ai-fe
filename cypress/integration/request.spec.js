describe('Request', () => {
    it('displays random users from API', () => {
      cy.request('https://jsonplaceholder.typicode.com/users')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.length(10)
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        })
    })
  })