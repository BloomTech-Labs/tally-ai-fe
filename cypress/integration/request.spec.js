describe('Request', () => {
    it('displays random users from API', () => {
      cy.request('https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/auth/register')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        })
    })
  })
  