const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('API testing / E-commerce', () => {
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

    describe('Testing - SESSIONS', () => {
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

})