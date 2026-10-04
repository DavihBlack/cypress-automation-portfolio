describe('SauceDemo Products', () => {

  beforeEach(() => {
    cy.fixture('users').then((users) => {
      cy.visit('/')

      cy.login(
      users.standardUser.username,
      users.standardUser.password
      )

    cy.url().should('include', '/inventory.html')
    })
  })

  it('displays the product inventory', () => {
    cy.get('[data-test="inventory-container"]').should('be.visible')

    cy.get('[data-test="inventory-item"]').should('have.length', 6)
  })

  it('keeps product name and price consistent between PLP and PDP', () => {
    cy.contains(
        '[data-test="inventory-item-name"]', 
        'Sauce Labs Backpack'
    )
        .parents('[data-test="inventory-item"]')
        .within(() => {
            cy.get('[data-test="inventory-item-name"]')
              .invoke('text')
              .as('productName')

            cy.get('[data-test="inventory-item-price"]')
              .invoke('text')
              .as('productPrice')

            cy.get('[data-test="inventory-item-name"]').click()
          })  
              
            cy.get('@productName').then((productName) => {
              cy.get('[data-test="inventory-item-name"]')
                .should('have.text', productName)  
            })
            
            cy.get('@productPrice').then((productPrice) => {
              cy.get('[data-test="inventory-item-price"]')
                .should('have.text', productPrice)
            })
    })

    it('sorts products by price from low to high', () => {
        cy.get('[data-test="product-sort-container"]').select('lohi')

        cy.get('[data-test="inventory-item-price"]')
          .then(($prices) => {
            const prices = [...$prices].map((price) =>
                parseFloat(price.innerText.replace('$', ''))
            )

            const sortedPrices = [...prices].sort((a, b) => a - b)

            expect(prices).to.deep.equal(sortedPrices)
          })
    })

    it('displays complete information for every product', () => {
        cy.get('[data-test="inventory-item"]').each(($product) => {
            cy.wrap($product).within(() => {
                cy.get('[data-test="inventory-item-name"]')
                  .should('be.visible')
                  .and('not.be.empty')

                cy.get('[data-test="inventory-item-desc"]')
                  .should('be.visible')
                  .and('not.be.empty')

                cy.get('[data-test="inventory-item-price"]')
                  .should('be.visible')
                  .and('not.be.empty')

                cy.get('img.inventory_item_img')
                  .should('be.visible')

                cy.get('button')
                  .should('be.visible')
                  .and('contain', 'Add to cart')
            })
        })
    })
})