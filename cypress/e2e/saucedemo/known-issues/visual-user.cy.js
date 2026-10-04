describe('SauceDemo Known Issue - Visual User', () => {

  beforeEach(() => {
    cy.fixture('users').as('users')
    cy.visit('/')
  })

  it('detects a price mismatch between PLP and PDP', () => {
    cy.get('@users').then((users) => {
      cy.login(
        users.visualUser.username,
        users.visualUser.password
      )
    })

    cy.url().should('include', '/inventory.html')

    cy.contains(
      '[data-test="inventory-item-name"]',
      'Sauce Labs Bike Light'
    )
      .parents('[data-test="inventory-item"]')
      .within(() => {
        cy.get('[data-test="inventory-item-price"]')
          .invoke('text')
          .as('plpPrice', { type: 'static'})

        cy.get('[data-test="inventory-item-name"]').click()
      })

    cy.url().should('include', '/inventory-item.html?id=0')

    cy.get('@plpPrice').then((plpPrice) => {
      cy.get('[data-test="inventory-item-price"]')
        .should('have.text', plpPrice)
    })
  })

})