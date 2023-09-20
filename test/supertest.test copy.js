const { faker } = require('@faker-js/faker')
const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('API testing / E-commerce', () => {
    //-------------TESTING SESSIONS----------
    describe('Testing - SESSIONS', () => {
        it('TEST 1 -', async () => {
            const newUser = {
                first_name: 'Api',
                last_name: 'Testig',
                email: faker.internet.email(),
                age: 18,
                password: faker.internet.password(),
            }
            await requester.post('/auth/register').send(newUser)
            let { email, password } = newUser
            let user = { email, password }
            await requester.post('/auth/login').send(user)
            let response = await requester.get('/products')
            console.log(response);
            expect(1).to.be.eql(1)
        })
        it('TEST 2 -', async () => {
            expect(1).to.be.eql(1)
        })
        it('TEST 3 -', async () => {
            expect(1).to.be.eql(1)
        })
    })
})

/*
//----------TESTING PRODUCTS-------------
describe('Testing - PRODUCTS', () => {
it('TEST 1 -', async () => {
    expect(1).to.be.eql(1)
})
it('TEST 2 -', async () => {
    expect(1).to.be.eql(1)
})
it('TEST 3 -', async () => {
    expect(1).to.be.eql(1)
})
})
//-------------TESTING CARTS--------------
describe('Testing - CARTS', () => {
it('TEST 1 - ', async () => {
    expect(1).to.be.eql(1)
})
it('TEST 2 - ', async () => {
    expect(1).to.be.eql(1)
})
it('TEST 3 - ', async () => {
    expect(1).to.be.eql(1)
})
})
})

describe('TEST API', () => {
describe('test endpoint', () => {
it('posteo y queda en el back', async () => {
    let pet = {
        name: 'loli',
        specie: 'cachorráo',
        birthDate: '10-10-1870',
    }
    const response = await requester.post('/api/pets').send(pet)
    const { status, ok, _body } = response;
    console.log(_body);
    expect(_body).to.have.property('payload').to.haveOwnProperty('name').to.be.eql('loli')
})
})
})

*/