# Steam Game Key Backend API

A RESTful API backend for managing Steam game keys.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Authentication](#authentication)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

This backend API provides the server-side functionality for the Steam Game Key Management System. It handles data storage, authentication, and business logic for managing game keys.

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your database of choice)
- Mongoose (or relevant ORM/ODM)
- JWT for authentication
- bcrypt for password hashing
- Nodemon for development

## Getting Started

### Prerequisites

- Node.js (v16.x or later recommended)
- MongoDB (or your database of choice)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/steamgk-backend.git
   cd steamgk-backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or if you use yarn
   yarn install
   ```

### Configuration

1. Create a `.env` file in the root directory
   ```bash
   touch .env
   ```

2. Add the following variables to the `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/steamgk
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

### Running the Server

For development with auto-reload:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Project Structure

```
steamgk-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── gameController.js
│   └── keyController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Game.js
│   └── Key.js
├── routes/
│   ├── auth.js
│   ├── games.js
│   └── keys.js
├── utils/
│   └── helpers.js
├── .env
├── server.js
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get a specific game
- `POST /api/games` - Create a new game (auth required)
- `PUT /api/games/:id` - Update a game (auth required)
- `DELETE /api/games/:id` - Delete a game (auth required)

### Keys
- `GET /api/keys` - Get all keys (auth required)
- `GET /api/keys/:id` - Get a specific key (auth required)
- `POST /api/keys` - Add a new key (auth required)
- `PUT /api/keys/:id` - Update a key (auth required)
- `DELETE /api/keys/:id` - Delete a key (auth required)

## Database

### MongoDB Collections

- **Users**: Stores user information
  - Fields: `_id`, `username`, `email`, `password`, `role`, `createdAt`

- **Games**: Stores game information
  - Fields: `_id`, `title`, `description`, `platform`, `image`, `createdAt`

- **Keys**: Stores game key information
  - Fields: `_id`, `key`, `gameId`, `userId`, `isUsed`, `createdAt`

## Authentication

This API uses JWT (JSON Web Tokens) for authentication:

1. Users register or login to receive a JWT token
2. The token must be included in the Authorization header for protected routes:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. The auth middleware validates the token before allowing access to protected routes

## Testing

Run tests using Jest:
```bash
npm test
```

## Deployment

### Preparing for Deployment
1. Update environment variables for production
2. Ensure database connection uses production URI
3. Set up proper error handling and logging

### Deployment Options
- **Heroku**: Deploy using the Heroku CLI or GitHub integration
- **Digital Ocean**: Deploy using App Platform
- **AWS**: Deploy to EC2 or Elastic Beanstalk
- **Railway**: Connect GitHub repository for automated deployments

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request
