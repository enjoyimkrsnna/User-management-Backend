# Investment Plan Management System with JWT Authentication and Docker

This project is a comprehensive CRUD application that manages user investment plans, with JWT authentication to secure user-related endpoints. Docker is used to containerize the application for easy deployment.

## Project Structure

- **`/Controllers`**: Contains the logic for handling requests and responses.
  - `auth.controller.js`: Handles user signup and login.
  - `user.controller.js`: Manages CRUD operations for users.
  - `mail.controller.js`: Handles OTP generation and password change.
  - `plan.controller.js`: Manages investment plans (create and get ROI).

- **`/Middleware`**: Contains middleware functions.
  - `auth.middleware.js`: Middleware to authenticate requests using JWT.

- **`/Models`**: Contains Mongoose models for database schemas.
  - `user.models.js`: Defines the User schema and methods.
  - `plan.models.js`: Defines the Plan schema and methods.

- **`/Routes`**: Contains route definitions.
  - `auth.route.js`: Routes for authentication (signup and login).
  - `user.route.js`: Routes for user management (CRUD operations).
  - `mail.route.js`: Routes for OTP requests and password changes.
  - `plan.route.js`: Routes for investment plans (create and get ROI).

- **`/config`**: Configuration files.
  - `generate-secret.js`: Script to generate a JWT secret key.

- **`.env`**: Environment variables file for storing sensitive information.

- **`package.json`**: Lists project dependencies and scripts.

- **`app.js`**: Entry point for the application. Sets up and starts the server.

## Installation

### Running Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/enjoyimkrsnna/User-management-Backend
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd User-management-Backend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**

   Create a `.env` file in the root directory with the following content:

   ```env
   JWT_SECRET=your_generated_secret_key
   SENDER_EMAIL=your_email@gmail.com
   SENDER_PASSWORD=your_email_password
   ```

   Replace `your_generated_secret_key`, `your_email@gmail.com`, and `your_email_password` with the appropriate values.

5. **Generate a JWT Secret Key:**

   Create a file `/config/generate-secret.js` with the following content:

   ```javascript
   const crypto = require('crypto');
   const secret = crypto.randomBytes(64).toString('hex');
   console.log('Generated Secret Key:', secret);
   ```

   Run the script to generate the secret key:

   ```bash
   node /config/generate-secret.js
   ```

   Copy the generated key and update the `JWT_SECRET` value in your `.env` file.

6. **Start the Server:**

   By default, the server runs on port `3000`. You can start the server using:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

### Using Docker

1. **Build and Run with Docker Compose:**

   Ensure you have Docker and Docker Compose installed. Navigate to the project directory and build the Docker image using:

   ```bash
   docker-compose up --build
   ```

   This command builds the Docker image and starts the application along with MongoDB.

2. **Access the Application:**

   Once the containers are running, the application will be accessible at `http://localhost:3000`.

3. **Stopping the Containers:**

   To stop the running containers, use:

   ```bash
   docker-compose down
   ```

## Docker Configuration

**`docker-compose.yml`**

```yaml
version: '3'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - MONGO_URI=mongodb://mongo:27017/CrudDB
    networks:
      - my-network

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - my-network

volumes:
  mongo_data:

networks:
  my-network:
```

**`Dockerfile`**

```Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## Usage

- **Base URL:** `http://localhost:3000/api/v1`

### Authentication

| **Endpoint**       | **Method** | **Request Body**                                                                                   | **Response**                           |
|--------------------|------------|----------------------------------------------------------------------------------------------------|----------------------------------------|
| `/api/v1/auth/signup` | POST       | `{ "email": "user@example.com", "password": "password123", "name": "John Doe", "gender": "male" }` | `{ "message": "User created successfully" }` |
| `/api/v1/auth/login`  | POST       | `{ "email": "user@example.com", "password": "password123" }`                                      | `{ "token": "your_jwt_token_here" }`  |

### Password Management

| **Endpoint**               | **Method** | **Request Body**                                                | **Response**                               |
|----------------------------|------------|-----------------------------------------------------------------|--------------------------------------------|
| `/api/v1/mail/request-otp` | GET        | `{ "email": "user@example.com" }`                                | `{ "message": "OTP sent to your email" }` |
| `/api/v1/mail/change-password` | PUT     | `{ "email": "user@example.com", "otp": "123456", "newPassword": "newpassword123" }` | `{ "message": "Password updated successfully" }` |

### User Management (Protected)

| **Endpoint**                | **Method** | **Request Headers**                                    | **Request Body**                    | **Response**                                |
|-----------------------------|------------|--------------------------------------------------------|-------------------------------------|---------------------------------------------|
| `/api/v1/users`             | GET        | `Authorization: Bearer your_jwt_token_here`            | N/A                                 | `[ { "email": "user@example.com", "name": "John Doe", "gender": "male" }, ... ]` |
| `/api/v1/users/:id`         | GET        | `Authorization: Bearer your_jwt_token_here`            | N/A                                 | `{ "email": "user@example.com", "name": "John Doe", "gender": "male" }` |
| `/api/v1/users/:id`         | PUT        | `Authorization: Bearer your_jwt_token_here`            | `{ "name": "Jane Doe", "gender": "female" }` | `{ "email": "user@example.com", "name": "Jane Doe", "gender": "female" }` |
| `/api/v1/users/:id`         | DELETE     | `Authorization: Bearer your_jwt_token_here`            | N/A                                 | `{ "message": "User deleted successfully" }` |

### Investment Plans (Protected)

| **Endpoint**                | **Method** | **Request Headers**                                    | **Request Body**                                          | **Response**                                 |
|-----------------------------|------------|--------------------------------------------------------|-----------------------------------------------------------|----------------------------------------------|
| `/api/v1/plans/createPlan`  | POST       | `Authorization: Bearer your_jwt_token_here`            | `{ "userId": "user_id", "investmentAmount": 1000, "investmentDays": 30, "roi": 5, "planStartDate": "01/01/2024" }` | `{ "message": "Plan created successfully", "plan": plan_details }` |
| `/api/v1/plans/roi/:userId` | GET        | `Authorization: Bearer your_jwt_token_here`            | N/A                                                       | `{ "roiDetails": [ { "planId": "plan_id", "investmentAmount": 1000, "investmentDays": 30, "planStartDate": "01/01/2024", "planExpiryDate": "01/31/2024", "roi": "5.00", "returnAmount": "1050.00" }, ... ] }` |

## Environment Variables

- `JWT_SECRET`: The secret key used for signing JWT tokens. Generated using the provided script.
- `SENDER_EMAIL`: Email address used for sending OTP and password reset emails.
- `SENDER_PASSWORD`: Password for the sender email account.

