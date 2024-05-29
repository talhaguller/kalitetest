import React from 'react'
import Chatbox from './Chatbox'

describe('<Chatbox />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Chatbox />)
  })
})