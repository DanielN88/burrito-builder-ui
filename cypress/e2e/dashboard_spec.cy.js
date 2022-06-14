describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      headers: {
        'x-requested-with': 'exampleClient',
      },
      fixture: 'getOrders'
    })
  })

  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })

  it('should see a title and all form elements', () => {
    cy.get('h1').should('have.text', 'Burrito Builder')
    cy.get('button').eq(0).should('have.text', 'beans')
    cy.get('button').eq(2).should('have.text', 'carnitas')
    cy.get('button').eq(4).should('have.text', 'lettuce')
  })

  it('should see initial cards', () => {
    cy.get('.order h3').eq(0).should('have.text', 'Pat')
    cy.get('.order h3').eq(2).should('have.text', 'Alex')
  })

  it('should be able to add an order', () => {
    cy.get('input').click().type('Daniel')
    cy.get('button').eq(0).click()
    cy.get('p').should('have.text', 'Order: beans')
    cy.get('button').eq(2).click()
    cy.get('p').should('have.text', 'Order: beans, carnitas')
    cy.get('button').eq(4).click()
    cy.get('p').should('have.text', 'Order: beans, carnitas, lettuce')

    cy.get('button').eq(12).should('have.text', 'Submit Order')
    cy.intercept("POST", 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        "name": "Daniel",
        "ingredients": ["beans", "carnitas", "lettuce"],
        "id": 4,
      }
    })
    cy.get('button').eq(12).click()
    cy.get('.order h3').eq(3).should('have.text', 'Daniel')
    cy.get('.order').eq(3).children().should('have.length', 2)
  })


})