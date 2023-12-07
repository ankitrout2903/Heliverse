# Project Name API

This repository contains the backend API for the Project Name project. Below, you will find a list of available endpoints and their corresponding functionalities.

## API Endpoints

### User Endpoints

#### 1. Get all filters

- **Endpoint:** `/api/filters`
- **Method:** `GET`
- **Description:** Retrieve all available filters.

#### 2. Get list of users

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Retrieve a list of all users.

#### 3. Get user by ID

- **Endpoint:** `/api/users/:id`
- **Method:** `GET`
- **Description:** Retrieve a specific user by their ID.

#### 4. Create a new user

- **Endpoint:** `/api/users`
- **Method:** `POST`
- **Description:** Create a new user.

#### 5. Update user by ID

- **Endpoint:** `/api/users/:id`
- **Method:** `PUT`
- **Description:** Update a specific user by their ID.

#### 6. Delete user by ID

- **Endpoint:** `/api/users/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific user by their ID.

#### 7. Get user list (duplicate)

- **Endpoint:** `/api/getUserList`
- **Method:** `GET`
- **Description:** Retrieve a list of all users.

### Team Endpoints

#### 8. Create a new team

- **Endpoint:** `/api/team`
- **Method:** `POST`
- **Description:** Create a new team.

#### 9. Get all teams

- **Endpoint:** `/api/teams`
- **Method:** `GET`
- **Description:** Retrieve a list of all teams.

#### 10. Get team by ID

- **Endpoint:** `/api/team/:id`
- **Method:** `GET`
- **Description:** Retrieve a specific team by its ID.

#### 11. Delete user from team

- **Endpoint:** `/api/team/:id/:userId`
- **Method:** `DELETE`
- **Description:** Remove a specific user from a team.

## Local Development

To run the API locally, make sure you have [Node.js](https://nodejs.org/) installed. Then, follow these steps:

1. Clone the repository.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the local development server.

The API will be accessible at `http://localhost:3000`.

## Deployment

The API is deployed at [https://hell-back.vercel.app](https://hell-back.vercel.app).

Feel free to explore and integrate with the provided endpoints! If you have any questions or issues, please contact the project maintainers.
