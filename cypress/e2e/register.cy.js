describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5001/')

    cy.get('#tabs-8--tab-1').click()

    cy.get('#first-name').type('talha')

    cy.get(':nth-child(2) > #email').type('talhaa1@example.com')

    cy.get(':nth-child(3) > .chakra-input__group > #password').type("12345678.")

    cy.get(':nth-child(4) > .chakra-input__group > #password').type("12345678.")

    cy.get('#tabs-8--tabpanel-1 > .chakra-stack > .css-1k7w19f').click()

    cy.reload()

    cy.get(':nth-child(1) > #email')
          .type('talhaa1@example.com')

    cy.get(':nth-child(2) > .chakra-input__group > #password').type('12345678.')
    
    cy.get('#tabs-8--tabpanel-0 > .chakra-stack > .css-1k7w19f').click()

    cy.get('#menu-button-89').click()

    cy.get('#menu-list-89-menuitem-91').click()
    
    cy.wait(5000) 
  })
})