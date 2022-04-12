const request = require('supertest');

const app = require('../../index');

describe('Product API', () =>{
    it('GET /products --> array products', () =>{
        return request(app)
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>{
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        ref: expect.any(String)
                    })
                ]))
            });
    });

    it('GET /products/id --> product by id', () => {
        return request(app)
            .get('/products/2')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>{
                expect(response.body).toEqual(
                    expect.objectContaining({
                        ref: expect.any(String)
                    })
                )
            });
    });
    it('GET /products/id --> 404 if not found', () => {
        return request(app)
            .get('/products/999999')
            .expect(404);
    });
    it('POST /products --> created product', () => {
        return request(app)
            .post('/products')
            .send({
                "ref":"teste22",
                "color": "teste22",
                "factory_id": 1,
                "cost": 10.0,
                "age_id":1,
                "gender_id":1
            }).expect('Content-Type', /json/)
            .expect(201)
            .then((response) =>{
                expect(response.body).toEqual(
                    expect.objectContaining({
                        ref: 'teste22'
                    })
                )
            });
    });
    it('GET /products/id --> validates request body', () => {
        return request(app)
            .post('/products')
            .send({
                'color': 'red'
            }).expect('Content-Type', /json/)
            .expect(400);
    });
})