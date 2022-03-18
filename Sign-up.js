/// <reference types="cypress"/>

describe('Sign-Up testing', function (){
    beforeEach(function(){
        cy.visit("https://cms-lyart.vercel.app/signup")
        cy.get("#signUp_email").as("email")
        cy.get("#signUp_password").as("password")
        cy.get("#signUp_confirmPassword").as("confirm-password")
        cy.get("#signUp_role label span input").as("Roles")
        cy.get("svg[data-icon='eye-invisible']").as("Eye-icon")
        cy.get("button[type='submit']").as("Sign-in")
    })
    it('Test-ID 1', function(){
        cy.get('@Roles').each((e1)=>{
            var types=e1.prop('type')
            expect(types).to.eq('radio')
        })

        cy.get("@email").invoke('attr','placeholder').should('eq','Please input email')        
        cy.get("@password").invoke('attr','placeholder').should('eq','please input password')   
        cy.get("@confirm-password").invoke('attr','placeholder').should('eq','Tap password again')
    })

    it('Test-ID 2',function(){
        cy.get("@email").invoke('attr','type').should('eq','email')

        cy.get("@email").type("123")
        cy.get("div[role]").should('have.text',"'email' is not a valid email")

        cy.get("@email").type("@gmail.com")
        cy.get("div[role]").should("not.be.true")

        cy.get("@email").clear()
        cy.get("div[role]").should('have.text',"'email' is required")

    })
    it('Test-ID 3', function(){
        cy.get("@password").invoke("attr","type").should('eq','password')

        cy.get("@password").type("123")
        cy.get("div[role]").should('have.text',"'password' must be between 4 and 16 characters")
        cy.get("@password").type("12345678912345")
        cy.get("div[role]").should('have.text',"'password' must be between 4 and 16 characters")

        cy.get("@password").clear().type("1234")
        cy.get("div[role]").should('not.be.true')
        cy.get("@password").type("567891234567")
        cy.get("div[role]").should('not.be.true')
        cy.get("@password").clear().type("abcdef")
        cy.get("div[role]").should('not.be.true')
        cy.get("@password").type("1234")
        cy.get("div[role]").should('not.be.true')
    })
    it('Test-ID 4', function(){
        cy.get("@Eye-icon").each((e1)=>{
            cy.wrap(e1).click();
        })
        
        cy.get("input[type='text']").each((e1) =>{
            cy.wrap(e1).type('1234')
            cy.get("div[role]").should('not.be.true')
            cy.wrap(e1).clear()
        })

        cy.get("input[type='text']").each((e1) =>{
            cy.wrap(e1).then((e1A)=>{
                const Att1 = e1A.prop('placeholder')
                if(Att1 === 'please input password'){
                    cy.wrap(e1).type('1234')
                }else{
                    cy.wrap(e1).type('12345')
                    cy.get("div[role]").should('have.text','The two passwords that you entered do not match!')
                }
            })
        })      
    })
    it('Test-ID 5',function(){
        cy.get('@password').type('1234')
        cy.get('@confirm-password').type('1234')
        cy.get("@Eye-icon").each((e1)=>{
            cy.wrap(e1).click()
        })
        cy.get("svg[data-icon='eye']").each((e1)=>{
            cy.wrap(e1).click()
        })
    })
    it('Test-ID 6',function(){
        cy.get('@Sign-in').click()
        cy.get("div[role]").should('have.length','4')
        cy.reload

        cy.get('@Roles').eq(0).check()
        cy.get('@email').type('abd@fake.com')
        cy.get("input[type='password']").each(e1=>{
            cy.wrap(e1).type('1234')
        })
        cy.get('@Sign-in').click()
        cy.get("div[role]").should('not.be.true')
    })
})