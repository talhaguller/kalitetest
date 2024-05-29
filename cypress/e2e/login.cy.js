describe('template spec', () => {
  it('Login And Web Visit ', () => {
    // Sayfayı ziyaret et
    cy.visit('http://localhost:5001/')

    cy.get(':nth-child(1) > #email')
          .type('tallhaa@example.com')

    cy.get(':nth-child(2) > .chakra-input__group > #password').type('12345678.')
    
    cy.get('#tabs-8--tabpanel-0 > .chakra-stack > .css-1k7w19f').click()
    
    cy.wait(5000) // 5 saniye beklet
    
    cy.url().should('include', '/chats')

    cy.get('.css-16prm0j > :nth-child(1) > .chakra-button').click()

    cy.get('#field-117').type('deneme')

    cy.get('#field-118').type('JUGMMA')

    cy.wait(5000) // 5 saniye beklet

    cy.get('.css-7n4n28').click()
    
    cy.get('#field-118').clear()
    cy.get('#field-118').type('talha')
    cy.wait(5000) // 5 saniye beklet

    cy.get('.css-7n4n28').click()

    cy.get('.chakra-modal__footer > .chakra-button').click()

    cy.get('.chakra-modal__footer > .chakra-button').click()

    cy.contains('deneme').click()
    
    cy.wait(10000) // 10 saniye beklet

    cy.get('#first-name').type('merhaba 1 ').type('{enter}')
    
    cy.wait(5000) // 5 saniye beklet


    cy.get('#first-name').type('merhaba 2 ').type('{enter}')

    cy.wait(7000) // 7 saniye beklet

    cy.contains('deneme').click()

    cy.get('.css-1hbeen3').click()

    cy.wait(5000) // 7 saniye beklet


    cy.contains('Leave Group').click()

    cy.wait(5000) // 5 saniye beklet

    cy.reload()

    cy.wait(3000)
    cy.contains('deneme').click()

    cy.get('.css-1hbeen3').click()

    cy.wait(5000) // 7 saniye beklet


    cy.contains('Leave Group').click()

    cy.wait(5000) // 5 saniye beklet

    cy.reload()

  })
})
