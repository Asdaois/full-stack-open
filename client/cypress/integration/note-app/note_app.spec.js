// note_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
//
describe('Note app', function () {
  it('create user in the database', function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/login/new', {
      name: 'root',
      password: 'root',
      username: 'root'
    })
  })

  it('front page can be openend', function () {
    cy.contains('login')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.get('input:first').type('root')
    cy.get('input:last').type('root')
    cy.contains('login').click()
  })

  it('when logged in', function () {
    cy.contains('add a new note').click()
    cy.get('[data-cy=note-text]').type('note created by cypress')
    cy.get('[data-cy=note-save]').click()
    cy.contains('note created by cypress')
  })

  it('login fails with wrong password', function () {
    cy.get('[data-button=logout]').click()
    cy.get('[data-cy=toggle-button-login]').click()

    cy.get('[data-cy=input-login-username]').type('root')
    cy.get('[data-cy=input-login-password]').type('wrong')

    cy.get('[data-cy=login-submit]').click()
    cy.get('[data-cy=login-error-message]').contains('error')
  })
})
