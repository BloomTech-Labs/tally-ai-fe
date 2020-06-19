describe('Request', () => {
    it('displays random users from API', () => {
      cy.request('http://localhost:5000/api/auth')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.length(1)
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        })
    })
  })
  