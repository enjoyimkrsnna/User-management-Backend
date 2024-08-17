# CRUD Application with JWT Authentication and Docker

This project is a CRUD application built using Node.js, Express, and MongoDB, with JWT authentication to secure user-related endpoints. Docker is used to containerize the application for easy deployment.

## Project Structure

- **`/Controllers`**: Contains the logic for handling requests and responses.
  - `auth.controller.js`: Handles user signup and login.
  - `user.controller.js`: Manages CRUD operations for users.

- **`/Middleware`**: Contains middleware functions.
  - `auth.middleware.js`: Middleware to authenticate requests using JWT.

- **`/Models`**: Contains Mongoose models for database schemas.
  - `user.models.js`: Defines the User schema and methods.

- **`/Routes`**: Contains route definitions.
  - `auth.route.js`: Routes for authentication (signup and login).
  - `user.route.js`: Routes for user management (CRUD operations).

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
   ```

   Replace `your_generated_secret_key` with the key generated using the script below.

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

1. **Sign Up:**

   **Endpoint:** `/api/v1/auth/signup`  
   **Method:** POST  
   **Request Body:**

   ```json
   {
     "email": "user@example.com",
     "password": "password123",
     "name": "John Doe",
     "gender": "male"
   }
   ```

   **Response:**

   ```json
   {
     "message": "User created successfully"
   }
   ```

2. **Log In:**

   **Endpoint:** `/api/v1/auth/login`  
   **Method:** POST  
   **Request Body:**

   ```json
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

   **Response:**

   ```json
   {
     "token": "your_jwt_token_here"
   }
   ```

   Use the returned token for authenticating requests to protected routes.

## API Endpoints

### User Routes (Protected)

1. **Get All Users:**

   **Endpoint:** `/api/v1/users`  
   **Method:** GET  
   **Headers:**

   ```http
   Authorization: Bearer your_jwt_token_here
   ```

   **Response:**

   ```json
   [
     {
       "email": "user@example.com",
       "name": "John Doe",
       "gender": "male"
     },
     ...
   ]
   ```

2. **Get Single User:**

   **Endpoint:** `/api/v1/users/:id`  
   **Method:** GET  
   **Headers:**

   ```http
   Authorization: Bearer your_jwt_token_here
   ```

   **Response:**

   ```json
   {
     "email": "user@example.com",
     "name": "John Doe",
     "gender": "male"
   }
   ```

3. **Update User:**

   **Endpoint:** `/api/v1/users/:id`  
   **Method:** PUT  
   **Headers:**

   ```http
   Authorization: Bearer your_jwt_token_here
   ```

   **Request Body:**

   ```json
   {
     "name": "Jane Doe",
     "gender": "female"
   }
   ```

   **Response:**

   ```json
   {
     "email": "user@example.com",
     "name": "Jane Doe",
     "gender": "female"
   }
   ```

4. **Delete User:**

   **Endpoint:** `/api/v1/users/:id`  
   **Method:** DELETE  
   **Headers:**

   ```http
   Authorization: Bearer your_jwt_token_here
   ```

   **Response:**

   ```json
   {
     "message": "User deleted successfully"
   }
   ```

## Environment Variables

- `JWT_SECRET`: The secret key used for signing JWT tokens. Generated using the provided script.

  
