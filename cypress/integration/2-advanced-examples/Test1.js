/// <reference types="cypress" />

describe('My First Test Suite', function(){
    beforeEach(function(){
        cy.visit('https://cms-lyart.vercel.app/');
    })
    it('Test_Case_1', function(){
        cy.get('#menu>ul>li>a').should('have.length',5).should('be.visible');      
    })
    it('Test_Case_2', function(){
        cy.get('#menu>ul:nth-child(1)>li:nth-child(1)>a').click();  
        cy.get('#logo').click();
        cy.get('#menu>ul:nth-child(1)>li:nth-child(2)>a').click();
        cy.get('#logo').click();
        cy.get('#menu>ul:nth-child(2)>li:nth-child(1)>a').click();
        cy.get('#logo').click();
        cy.get('#menu>ul:nth-child(2)>li:nth-child(2)>a').click();
        cy.get('#logo').click();
        cy.get("a[href^='/l']").click();
        cy.get('#logo').click();
    })
    it('Test_Case_3', function(){
        cy.scrollTo('bottom');
        cy.get('#menu>ul>li>a').should('have.length',5).should('be.visible');
    })
    it('Test_Case_4', function(){
        cy.get('#header').should('have.css','background-color','rgba(0, 0, 0, 0)');
        cy.scrollTo('bottom');
        cy.wait(2000);
        cy.get('#header').should('have.css','background-color','rgb(82, 100, 128)');
    })
})