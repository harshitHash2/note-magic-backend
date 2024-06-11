# iNotebook Backend

This is the backend of iNotebook, a web application that allows users to create, manage, and store notes on the cloud. It is built with Node.js, Express.js, and MongoDB, providing robust and secure backend services, including user authentication and CRUD operations for notes.

## Features

- **User Authentication:** Secure sign-up and login processes with password encryption using bcrypt and JWT.
- **Notes Management:** Full CRUD (Create, Read, Update, Delete) operations for managing user notes.
- **RESTful API:** Well-structured and RESTful API endpoints.
- **MongoDB Integration:** Seamless integration with MongoDB for data storage.
- **Environment Variables:** Configuration using environment variables for security.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens) and bcrypt
- **Environment Management:** dotenv

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB database setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/inotebook-backend.git
   cd inotebook-backend

## Running the Application

1. Start the Server:

   `nodemon index.js`

2. The server will start on `http://localhost:5000`

## API Endpoints

**Authentication**

- POST /auth/signup: Register a new user
- POST /auth/login: Login an existing user

**Notes**

- GET /user/fetchallnotes: Get all notes for the logged-in user
- POST /user/newnote: Create a new note
- PUT /user/note/:id : Update an existing note
- DELETE /user/deketenote/:id : Delete a note

## Usage

1. Use an API client (like Postman) to interact with the API endpoints.
2. Use the provided endpoints to register, login, and manage notes.

## Contributing

Contributions are welcome! Please follow these steps:
- Fork the repository.
- Create a new branch `git checkout -b feature/your-feature-name`
- Commit your changes `git commit -m 'Add some feature`
- Push to the branch `git push origin feature/your-feature-name`
- Open a pull request

## Contact

For any questions or suggestions, please reach out to me at `harshit.chauhan2015@gmail.com`.
