const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(() => {
        connection.migrate.rollback();
        connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });


    it('should be able to create a new ONG', async() => {
        const response = await request(app).post('/ongs').send({
            nome: "APAD ZOO",
            email: "zoo@zoo.com",
            whatsapp: "123456789",
            city: "chile",
            uf: "CH"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveProperty(8);

    });
});