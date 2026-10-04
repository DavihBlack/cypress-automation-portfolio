describe('SauceDemo Login', () => {

  beforeEach(() => {
    cy.fixture('users').as('users')
    cy.visit('/')
  })

  it('loads the login page', () => {
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')
  })

  it('logs in successfully with a valid user', () => {
    cy.get('@users').then((users) => {
      cy.login(
        users.standardUser.username,
        users.standardUser.password
      )
    })

    cy.url().should('include', '/inventory.html')
    cy.get('[data-test="inventory-container"]').should('be.visible')
  })

  it('shows an error message with invalid credentials', () => {
    cy.get('@users').then((users) => {
      cy.login(
        users.invalidUser.username,
        users.invalidUser.password
      )
    })

  cy.get('[data-test="error"]')
    .should('be.visible')
    .and(
      'contain',
      'Username and password do not match any user in this service'
    )
  })

  it('shows an error message for a locked out user', () => {
    cy.get('@users').then((users) => {
      cy.login(
        users.lockedOutUser.username,
        users.lockedOutUser.password
      )
    })

  cy.get('[data-test="error"]')
    .should('be.visible')
    .and(
      'contain',
      'Sorry, this user has been locked out.'
    )
  })

  it('shows an error message when username is empty', () => {
    cy.get('@users').then((users) => {
      cy.get('[data-test="password"]').type(users.standardUser.password)
    })

  cy.get('[data-test="login-button"]').click()

  cy.get('[data-test="error"]')
    .should('be.visible')
    .and(
      'contain',
      'Username is required'
    )
  })

  it('shows an error message when password is empty', () => {
    cy.get('@users').then((users) => {
      cy.get('[data-test="username"]').type(users.standardUser.username)
    })

  cy.get('[data-test="login-button"]').click()

  cy.get('[data-test="error"]')
    .should('be.visible')
    .and(
      'contain',
      'Password is required'
    )
  })

})