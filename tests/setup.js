const { connectDB } = require("../config/mongodb_Test");

// Global setup
beforeAll(async () => {
  await connectDB();
});

// Global teardown
afterAll(async () => {
  const { getDB } = require("../config/mongodb_Test");
  const client = getDB().client;
  await client.close();
});
