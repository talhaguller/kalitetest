import React from 'react'
import Chatpage from './Chatpage'

describe('<Chatpage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Chatpage />)
  })
})