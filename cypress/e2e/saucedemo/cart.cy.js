describe('SauceDemo Cart', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.fixture('users').then((users) => {
      cy.visit('/')

      cy.login(
      users.standardUser.username,
      users.standardUser.password
      )

    cy.url().should('include', '/inventory.html')
    })
  })

  it('adds a product to the cart successfully', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('be.visible')
      .and('have.text', '1')

    cy.get('[data-test="shopping-cart-link"]').click()

    cy.url().should('include', '/cart.html')

    cy.get('[data-test="inventory-item-name"]')
      .should('have.text', 'Sauce Labs Backpack')

    cy.get('[data-test="inventory-item-price"]')
      .should('have.text', '$29.99')
  })

  it('removes a product from the cart successfully', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('have.text', '1')

    cy.get('[data-test="shopping-cart-link"]').click()

    cy.get('[data-test="remove-sauce-labs-backpack"]').click()

    cy.get('[data-test="inventory-item-name"]')
      .should('not.exist')

    cy.get('[data-test="shopping-cart-badge"]')
      .should('not.exist')
      })

  it('updates the cart correctly when multiple products are added', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('have.text', '2')

    cy.get('[data-test="shopping-cart-link"]').click()

    cy.get('[data-test="inventory-item"]')
      .should('have.length', 2)

    cy.contains(
      '[data-test="inventory-item-name"]',
      'Sauce Labs Backpack'
    ).should('be.visible')

    cy.contains(
      '[data-test="inventory-item-name"]',
      'Sauce Labs Bike Light'
    ).should('be.visible')
  })

})