/// <reference types="cypress" />

describe('Sign-In testing', function(){
    beforeEach(function(){
        cy.visit("https://cms-lyart.vercel.app/login");
        cy.get('#login_email').as('email')
        cy.get("#login_role label span input[value='student']").as('Student')
        cy.get('#login_password').as('password')
    })
    it('Test-ID 1',function(){     
        cy.get('@Student').should('be.checked');
        
        cy.get("#login_remember").should('be.checked');
        
        cy.get("@email").then(function(e1){
            const email = e1.prop("placeholder")
            expect(email).to.equal('Please input email')
        })
        
        cy.get("@password").then(function(e2){
            const password = e2.prop("placeholder")
            expect(password).to.equal('Please input password')
        })
    })
    it('Test-ID 2', function(){
        cy.get('@email').type('abc@gmail.com')
        cy.get("div[role]").should('not.be.true')
        
        cy.get('@email').clear()
        cy.get('div[role]').then(function(e1){
            const error1 = e1.text()
            expect(error1).to.equal("'email' is required")
        })
        
        cy.get('@email').type('abc')
        cy.get("div[role]").then(function(e2){
            const error2 = e2.text()
            expect(error2).to.equal("'email' is not a valid email")
        })
        
    })

    it('Test-ID 3',function(){     
        cy.get('@password').invoke('attr','type').should('eq','password')
        
        cy.get('@password').type('123')
        cy.get('div[role]').then(function(e1){
            const error1 = e1.text()
            expect(error1).to.equal("'password' must be between 4 and 16 characters")
        })

        cy.get('@password').clear()
        cy.get('div[role]').then(function(e2){
            const error2 = e2.text()
            expect(error2).to.equal("'password' is required")
        })
        
        cy.get('@password').type('1234')
        cy.get('div[role]').should('not.be.true')

        cy.get('@password').type('567891234567')
        cy.get('div[role]').should('not.be.true')

        cy.get('@password').clear().type('abcdefg')
        cy.get('div[role]').should('not.be.true')

        cy.get('@password').type('1234567')
        cy.get('div[role]').should('not.be.true')

        cy.get('@password').clear().type('12345678912345678')
        cy.get('div[role]').then(function(e3){
            const error3 = e3.text()
            expect(error3).to.equal("'password' must be between 4 and 16 characters")
        })
        
        cy.get('@password').clear().type(' ')
        cy.get('div[role]').then(function(e3){
            const error3 = e3.text()
            expect(error3).to.equal("'password' must be between 4 and 16 characters")
        })
    })
    it.only('Test-ID 4',function(){
        cy.get('@email').type('student@admin.com')
        cy.get('@password').type('111111')
        cy.get('button[type]').click()
    })

})