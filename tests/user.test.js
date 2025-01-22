const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../app'); 
const { v4: uuidv4 } = require("uuid");


let db;
let testUserId;

beforeAll(async () => {
  // Connect to the test database
  const client = await MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true });
  db = client.db('testdb'); // Use a separate database for testing
  app.locals.db = db;
});

afterAll(async () => {
  // Clean up database after tests
  await db.collection('users').deleteMany({});
});

describe('User API', () => {
  test('POST /users - should create a new user', async () => {
    const newUser = {id: uuidv4(), name: 'John Doe', email: 'johndoe@example.com', age: 30 };
    const response = await request(app).post('/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.id).toBeDefined();


    testUserId = response.body.id;
  });

  test('GET /users - should return all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  
 
  test('GET /users/:id - should return a user by ID', async () => {
    const response = await request(app).get(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testUserId);
    expect(response.body.name).toBeDefined();
    expect(response.body.email).toBeDefined();
  });

  test('PUT /users/:id - should update a user by ID', async () => {
    const updatedData = { name: 'Jane Doe', email: 'janedoe@example.com', age: 25 };
    const response = await request(app).put(`/users/${testUserId}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.email).toBe(updatedData.email);
  });

  test('DELETE /users/:id - should delete a user by ID', async () => {
    const response = await request(app).delete(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  test('GET /users/:id - should return 404 for a non-existent user', async () => {
    const response = await request(app).get(`/users/${testUserId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });


});
