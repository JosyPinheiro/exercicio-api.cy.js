/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import contrato from '../contratos/usuarios.contrato'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync()
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')

    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        "nome": (faker.name.firstName()),
        "email": (faker.internet.email()),
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')

    })
  });

  it.only('Deve validar um usuário com email inválido', () => {
    cy.request({
      method:'POST',
      url: '/usuarios',
      body: {
        "nome": "usuario editado EBAC novo2",
        "email": "testeeditado@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).equal(400)
      expect(response.message).equal('Este email já está sendo usado')
    })

  })

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'PUT',
      url: '/usuarios' + '/0uxuPY0cbmQhpEz1',
      body: {
        "nome": "usuario editado EBAC novo2",
        "email": "testeeditado@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body.message).equal('Registro alterado com sucesso')
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        "nome": (faker.name.firstName()),
        "email": (faker.internet.email()),
        "password": "teste",
        "administrador": "true"
      } 
    }).then((response) => {
      cy.request({
        method: 'DELETE',
        url: '/usuarios/' + response.body._id,
      }).should((response) => {
        expect(response.status).equal(200)
        expect(response.body.message).equal('Registro excluído com sucesso')
      })
    })
    
  })
})

