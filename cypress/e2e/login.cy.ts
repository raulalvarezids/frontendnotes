describe('Login testing', () => {

    it('user can not acces to home if is not logged',() => {
       cy.visit('/')
       cy.url().should('eq','http://localhost:4173/login')
    })

    it('user with wrong credentials can not pass', () =>{
        cy.visit('/login')
        cy.get('#email').type('wrong@gmail.com')
        cy.get('#password').type('wrong')
        cy.get('#botonlogin').click()                
        cy.get('#errorti').contains('No User matches the given query.')        
    })
     

    it('user can acces', () => {
        cy.visit('/login')
        cy.get('#email').type('raul@gmail.com')
        cy.get('#password').type('raul')
        cy.get('#botonlogin').click()               
        cy.url().should('eq','http://localhost:4173/')
    })
  })
  