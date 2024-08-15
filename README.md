Here's a complete `README.md` file for your User Management Backend project:

---

# User Management API 

## Overview

The **User Management Backend** is a RESTful API built using Node.js and MongoDB that provides functionality for managing user data. This backend service supports creating, reading, updating, and deleting user records.

## Features

- **CRUD Operations**: Perform create, read, update, and delete operations on user records.
- **User Authentication**: Manage user credentials and basic profile information.
- **Data Storage**: Utilizes MongoDB for data storage and retrieval.

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **ORM**: Mongoose

## Folder Structure

- **`/Controllers`**: Contains the business logic for handling user-related requests.
  - **`user.controller.js`**: Functions for managing user operations such as retrieving, creating, updating, and deleting users.

- **`/Models`**: Contains Mongoose schema definitions and models for interacting with MongoDB.
  - **`user.models.js`**: Defines the Mongoose schema for the User collection, including fields like `email`, `password`, `name`, and `gender`.

- **`/Routes`**: Contains route definitions for the API endpoints.
  - **`user.route.js`**: Maps HTTP requests to controller functions for user operations.

- **`package.json`**: Contains metadata about the project, including dependencies and scripts.

- **`README.md`**: This file, providing an overview of the project, installation instructions, and usage details.

- **`app.js`**: The entry point of the application. Sets up the Express server, connects to MongoDB, and configures middleware and routes.

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/enjoyimkrsnna/User-management-Backend.git
    cd User-management-Backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Application**

    ```bash
    npm start
    ```

    The server will start on port 3000 by default. You can change this in the `app.js` file if needed.

## API Endpoints

- **Get All Users**

    ```http
    GET /api/v1/users
    ```

- **Get Single User**

    ```http
    GET /api/v1/users/:id
    ```

- **Create User**

    ```http
    POST /api/v1/users
    ```

    **Request Body:**

    ```json
    {
        "email": "user@example.com",
        "password": "password123",
        "name": "John Doe",
        "gender": "male"
    }
    ```

- **Update User**

    ```http
    PUT /api/v1/users/:id
    ```

    **Request Body:**

    ```json
    {
        "email": "newuser@example.com",
        "password": "newpassword123",
        "name": "John Smith",
        "gender": "male"
    }
    ```

- **Delete User**

    ```http
    DELETE /api/v1/users/:id
    ```
