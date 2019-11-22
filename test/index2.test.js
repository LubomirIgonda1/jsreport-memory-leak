const supertest = require('supertest')
const app = require('../src')
const request = supertest(app)

describe('Rendering', () => {
    it('Test', async () => {
        const t = await request.get('/test')
        expect(t.status).toBe(200)
    }) 
})
