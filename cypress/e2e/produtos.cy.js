/// <reference types="cypress"/>

describe('Teste de API em produtos', () => {
    
    it('Listrar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/#/Produtos',

        })
    });
});