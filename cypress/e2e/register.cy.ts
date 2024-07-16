describe('register testing', () =>{

  it('user can not accces with a existing user',()=> {
    cy.visit('/register')
    cy.get('#username').type('raul')
    cy.get('#email').type('raul@gmail.com')
    cy.get('#password').type('raul')
    cy.get('button').click()
    cy.get('#errorcitos').contains('A user with that username already exists.')

  })  
  it('user can not accces with a existig emial',()=> {
    cy.visit('/register')
    cy.get('#username').type('raulnew')
    cy.get('#email').type('raul@gmail.com')
    cy.get('#password').type('raul')
    cy.get('button').click()
    cy.get('#errorcitos').contains('Email alredy exist')

  })

  it('user can create a profile',()=> {
    cy.visit('/register')
    cy.get('#username').type('wasa')
    cy.get('#email').type('wasa@gmail.com')
    cy.get('#password').type('wasa')
    cy.get('button').click()
    cy.url().should('eq','http://localhost:4173/')

  })


})
