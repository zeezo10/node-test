// node-test/middleware/validate.test.js
const request = require('supertest');
const express = require('express');
const { validateUser } = require('../middleware/validate');

const app = express();
app.use(express.json());
app.post('/test', validateUser, (req, res) => {
    res.status(200).json({ message: 'User is valid' });
});

describe('validateUser middleware', () => {
    test('should return 400 if name is missing', async () => {
        const response = await request(app).post('/test').send({ email: 'test@example.com', age: 25 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name is required');
    });

    test('should return 400 if email is missing', async () => {
        const response = await request(app).post('/test').send({ name: 'John', age: 25 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email is required');
    });

    test('should return 400 if age is not a number', async () => {
        const response = await request(app).post('/test').send({ name: 'John', email: 'test@example.com', age: 'twenty-five' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Age must be a number');
    });

    test('should return 400 if name is not a string', async () => {
        const response = await request(app).post('/test').send({ name: 123, email: 'test@example.com', age: 25 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name Invalid');
    });

    test('should return 400 if email format is invalid', async () => {
        const response = await request(app).post('/test').send({ name: 'John', email: 'invalid-email', age: 25 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid email format');
    });

    test('should call next() if all inputs are valid', async () => {
        const response = await request(app).post('/test').send({ name: 'John', email: 'test@example.com', age: 25 });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User is valid');
    });
});