
describe('Notes testing', () => {

    it('if user do not have notes show a message',() => {
       cy.login('jose','jose')
       cy.get('.without').should('contain','Sin notas')

    })

    it('if user have notes can see them',() => {
        cy.login('raul','raul')        
        cy.contains('h4','Nueva nota')        
    })    

    it('use can add new note',() => {
        cy.login('jose','jose')  
        cy.get('.notas').click()
        cy.get('#tittle').type('cypress')
        cy.get('#description').type('content from cypress note')
        cy.get('#add').click()
        cy.contains('h4','cypress')    
    })

    it('user can delete the notes',() => {
        cy.login('jose','jose')
        cy.get('#cypress').click()
        cy.get('#cypress').should('not.exist')
    })

    it('user can edit the notes',() => {
        cy.login('raul','raul')        
        cy.get('h4').contains('Nueva nota').click()

        cy.get('#tittle').clear().type('Actualizada')
        cy.get('#update').click()

        
        cy.contains('h4','Nueva nota').should('not.exist')
        cy.get('h4').contains('Actualizada').should('exist')
    })
})