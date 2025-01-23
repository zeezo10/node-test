# User Management API

A RESTful API built with Node.js, Express, and MongoDB for managing user data.

## Prerequisites

- Node.js (v12 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd node-test
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=<your-mongodb-connection-string>
PORT=3000
```

## Running the Application

1. Start the server:

```bash
npm start
```

2. The API will be available at `http://localhost:3000`

## API Endpoints

### Users

- **GET /users** - Get all users
- **GET /users/:id** - Get a specific user by ID
- **POST /users** - Create a new user
- **PUT /users/:id** - Update a user
- **DELETE /users/:id** - Delete a user

### Request Body Format (POST/PUT)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

## Data Validation

The API validates:

- Name (required, must be a string)
- Email (required, must be a valid email format, uniq)
- Age (required, must be a number)

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Server Error

## Testing

Run the test suite:

```bash
npm test
```

View test coverage:

```bash
npm run coverage
```

## Logging

Request logs are stored in `logs/requests.log`

## Project Structure

```
node-test/
├── config/
│   └── mongodb.js
├── middleware/
│   ├── logger.js
│   └── validate.js
├── user_crud_api/
│   ├── controllers/
│   │   └── Users.js
│   ├── models/
│   │   └── User.model.js
│   └── routes/
│       └── User.js
├── .env
├── .env.example
├── .gitignore
├── app.js
└── package.json
```


