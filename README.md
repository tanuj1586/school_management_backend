A backend API built with Node.js, Express, and MongoDB for managing a school system with authentication, users, and data handling.

🚀 Features
Authentication (JWT)
Password hashing (bcryptjs)
MongoDB integration (Mongoose)
CORS enabled for frontend connection
Environment variable support (.env)
RESTful API structure


Tech Stack
Node.js
Express.js ^5.2.1
MongoDB (via Mongoose ^9.4.1)
JWT (jsonwebtoken ^9.0.3)
bcryptjs ^3.0.3
dotenv ^17.4.1
cors ^2.8.6
nodemon (dev dependency recommended)



Make ENV WITH BELOW VARIABLE
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key