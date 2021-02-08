/* To run only one test write: it.only */
/* To pause between each step of a test write cy.pause() only one test write: it.only */


/* Testing different viewports -- See presets: https://docs.cypress.io/api/commands/viewport.html#Syntax  */
const sizes = ['iphone-6', 'ipad-2', [1024, 768]]

describe('FirstPage ', function() {
  sizes.forEach((size) => {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Uniswap')
  })
  it('Menu can be opened', function() {
    cy.get('.bm-burger-button > button').click()
    cy.contains('Market').click({ force: true})
    cy.contains('Alphabetical A-Z')
  })
  it('Menu can be opened and closed', function() {
    cy.get('.bm-burger-button > button').click()
    cy.contains('Market')
    cy.get('.bm-cross-button > button').click()
    cy.contains('Uniswap')
  })
})
})