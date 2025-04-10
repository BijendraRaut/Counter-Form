# Task Manager API

A RESTful API built with Node.js, Express, and MySQL for managing tasks with user authentication.

## Features

- User registration and login with JWT authentication
- CRUD operations for tasks
- Task filtering by status (pending, in-progress, completed)
- Pagination for task listings
- Secure password hashing with bcrypt
- Input validation and error handling

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Bcryptjs
- Express Validator

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- Postman (for API testing)

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/BijendrRaut/task-manager-api.git]
   cd task-manager-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `task_manager`
   - Run the SQL schema from `database/schema.sql`

4. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=88896
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=task_manager
   JWT_SECRET=your_random_secret_key_here
   PORT=3000
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | /api/auth/register | Register a new user  |
| POST   | /api/auth/login    | Login and get JWT token |
| GET    | /api/auth/me       | Get current user info |

### Tasks

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | /api/tasks       | Get all tasks (supports pagination and filtering) |
| POST   | /api/tasks       | Create a new task    |
| GET    | /api/tasks/:id   | Get a specific task  |
| PUT    | /api/tasks/:id   | Update a task        |
| DELETE | /api/tasks/:id   | Delete a task        |

## Request/Response Examples

### User Registration
**Request:**
```json
POST /api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### Task Creation
**Request:**
```json
POST /api/tasks
Headers: Authorization: Bearer <your_token>
{
  "title": "Complete assignment",
  "description": "Finish the Node.js project",
  "dueDate": "2023-12-31"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Complete assignment",
  "description": "Finish the Node.js project",
  "status": "pending",
  "due_date": "2023-12-31T00:00:00.000Z",
  "user_id": 1
}
```

### Get Tasks with Pagination
**Request:**
```
GET /api/tasks?page=1&limit=5&status=pending
Headers: Authorization: Bearer <your_token>
```

**Response:**
```json
{
  "tasks": [...],
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalTasks": 10,
    "totalPages": 2
  }
}
```

## Database Schema

### Users Table
| Column     | Type         | Description          |
|------------|--------------|----------------------|
| id         | INT          | Primary key          |
| username   | VARCHAR(50)  | User's name          |
| email      | VARCHAR(100) | User's email         |
| password   | VARCHAR(255) | Hashed password      |
| created_at | TIMESTAMP    | Creation timestamp   |

### Tasks Table
| Column     | Type                         | Description          |
|------------|------------------------------|----------------------|
| id         | INT                          | Primary key          |
| title      | VARCHAR(100)                 | Task title           |
| description| TEXT                         | Task description     |
| status     | ENUM('pending','in-progress','completed') | Task status |
| due_date   | DATE                         | Due date             |
| user_id    | INT                          | Foreign key to users |
| created_at | TIMESTAMP                    | Creation timestamp   |

## Error Handling

The API returns appropriate HTTP status codes:

- 400 Bad Request - Invalid input data
- 401 Unauthorized - Missing or invalid authentication
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error

Errors include a message and optional details:
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Invalid status value",
      "param": "status",
      "location": "query"
    }
  ]
}
```

## Deployment

To deploy this API:

1. Set up a MySQL database on your hosting provider
2. Configure environment variables in production
3. Start the server using:
   ```bash
   npm start
   ```

For production, consider using:
- PM2 for process management
- Nginx as a reverse proxy
- SSL/TLS for secure connections

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
```

## Additional Files to Include

1. Create a `LICENSE` file if you want to add an open-source license
2. Add a `.gitignore` file with:
   ```
   node_modules/
   .env
   .DS_Store
   ```

This README provides:
- Clear installation instructions
- API documentation
- Examples of requests/responses
- Database schema information
- Error handling details
- Deployment guidelines
- Contribution information

You can customize it further by adding:
- Screenshots of Postman examples
- Badges for build status or code quality
- More detailed deployment instructions for specific platforms
