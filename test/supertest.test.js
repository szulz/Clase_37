const { faker } = require('@faker-js/faker')
const chai = require('chai')
const { Session } = require('express-session')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('API testing / E-commerce', () => {
    let cookie;
    let createdProduct;
    let user_in_session;
    describe('Testing - SESSIONS', () => {
        it('TEST 1 - Loggeo y devuelvo el user en session', async () => {
            let user = {
                email: 'test@admin.com',
                password: '123'
            }
            let result = await requester.post('/auth/login').send(user)
            let cookieResult = await result.header['set-cookie'][0].split(';')[0];
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }
            let { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);
            user_in_session = _body.payload;
            expect(_body).to.have.property('payload').to.haveOwnProperty('email').to.be.eql(user.email)
        }).timeout(50000);
    })
    describe('Testing - PRODUCTS', () => {
        it('TEST 1 - Devuelvo todos los productos', async () => {
            let { ok, status, _body } = await requester.get('/products').set('Cookie', [`${cookie.name}=${cookie.value}`]);
            expect(ok).to.be.eql(true)
            expect(status).to.be.eql(200)
        }).timeout(50000);
        it('TEST 2 - Creo producto', async () => {
            let newProduct = {
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: faker.number.int(10),
            }
            let { _body, status } = await requester.post('/products/create').send(newProduct).set('Cookie', [`${cookie.name}=${cookie.value}`]);
            expect(_body).to.haveOwnProperty('data').to.haveOwnProperty('_id')
            createdProduct = _body.data._id
            expect(status).to.be.eql(200)
        }).timeout(50000);
        it('TEST 3 - DEVUELVO PRODUCTO', async () => {
            let { _body, status } = await requester.get(`/products/get-one/${createdProduct}`);
            expect(_body).to.haveOwnProperty('payload').to.haveOwnProperty('_id').to.be.eql(createdProduct)
            expect(status).to.be.eql(200)
        }).timeout(50000)
    })
    describe('Testing - CARTS', () => {
        it('TEST 1 - Agrego producto al carro', async () => {
            let { _body, status } = await requester.post(`/carts/products/${createdProduct}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
            expect(_body).to.haveOwnProperty('data').to.haveOwnProperty('cart')
            expect(status).to.be.eql(200)
        }).timeout(50000);
        it('TEST 2 - Detalles de mi carro', async () => {
            let { status } = await requester.get(`/carts/${user_in_session.cart}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
            expect(status).to.be.eql(200)
        }).timeout(50000)
        it('TEST 3 - /:cid/products/:pid - Elimino producto creado del carro', async () => {
            let { _body, status } = await requester.delete(`/carts/${user_in_session.cart}/products/${createdProduct}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
            expect(_body).to.haveOwnProperty('data').to.haveOwnProperty('_id')
            expect(status).to.be.eql(200)
        }).timeout(50000)
    })
})