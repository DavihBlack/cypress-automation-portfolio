describe('SauceDemo Checkout', () => {

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.fixture('checkout').as('checkout')
    cy.fixture('users').then((users) => {
      cy.visit('/')

      cy.login(
      users.standardUser.username,
      users.standardUser.password
      )

    cy.url().should('include', '/inventory.html')
    })

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()

    cy.url().should('include', '/cart.html')
  })

  it('completes checkout successfully', () => {
    cy.get('[data-test="checkout"]').click()

    cy.url().should('include', '/checkout-step-one.html')

    cy.get('@checkout').then((checkout) => {
      cy.get('[data-test="firstName"]').type(checkout.customer.firstName)
      cy.get('[data-test="lastName"]').type(checkout.customer.lastName)
      cy.get('[data-test="postalCode"]').type(checkout.customer.postalCode)
    })

    cy.get('[data-test="continue"]').click()

    cy.url().should('include', '/checkout-step-two.html')

    cy.get('[data-test="inventory-item-name"]')
      .should('have.text', 'Sauce Labs Backpack')

    cy.get('[data-test="inventory-item-price"]')
      .should('have.text', '$29.99')

    cy.get('[data-test="subtotal-label"]')
      .should('contain', '$29.99')

    cy.get('[data-test="tax-label"]')
      .should('contain', '$2.40')

    cy.get('[data-test="total-label"]')
      .should('contain', '$32.39')

    cy.get('[data-test="finish"]').click()

    cy.url().should('include', '/checkout-complete.html')

    cy.get('[data-test="complete-header"]')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!')
  })

  it('shows an error when first name is empty', () => {
    cy.get('[data-test="checkout"]').click()

    cy.get('@checkout').then((checkout) => {
      cy.get('[data-test="lastName"]').type(checkout.customer.lastName)
      cy.get('[data-test="postalCode"]').type(checkout.customer.postalCode)
    })

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Error: First Name is required')
  })

  it('shows an error when last name is empty', () => {
    cy.get('[data-test="checkout"]').click()

    cy.get('@checkout').then((checkout) => {
      cy.get('[data-test="firstName"]').type(checkout.customer.firstName)
      cy.get('[data-test="postalCode"]').type(checkout.customer.postalCode)
    })

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Error: Last Name is required')
  })

  it('shows an error when postal code is empty', () => {
    cy.get('[data-test="checkout"]').click()

    cy.get('@checkout').then((checkout) => {
    cy.get('[data-test="firstName"]').type(checkout.customer.firstName)
    cy.get('[data-test="lastName"]').type(checkout.customer.lastName)
    })

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Error: Postal Code is required')
  })

})