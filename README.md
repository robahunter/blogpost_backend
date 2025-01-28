Blog Posting Platform - Backend
Overview

This is the backend of a Blog Posting Platform, allowing users to register, create and manage profiles, write blog posts, interact with posts through comments, likes, ratings, and search functionalities. The project is built using Node.js, Express.js, and MongoDB.
Features
User Authentication and Profile Management

    User Registration and Login with JWT-based authentication.
    Profile management (update name, bio, and profile picture).
    Follow and unfollow users.

Blog Management

    CRUD Operations:
        Create, Read, Update, and Delete blogs.
        Only the author can edit or delete their blogs.
    Search for blogs by title, content, or tags.

Blog Interactions

    Comments:
        Add, edit, and delete comments on blog posts (only by the author of the comment).
    Likes:
        Like and unlike a blog post.
    Ratings:
        Rate blogs on a scale of 1-5 (each user can rate only once).
        Display average ratings for a blog.

Search

    Search users by name or username.
    Search blog posts by title, content, or tags.

Technology Stack

    Backend Framework: Node.js, Express.js
    Database: MongoDB (Mongoose ORM)
    Authentication: JSON Web Tokens (JWT)
    Testing: Jest and Supertest
    Other Tools: Postman (for API testing)

Setup Instructions
Prerequisites

    Node.js installed (v16 or later).
    MongoDB installed locally or access to a MongoDB Atlas database.
    Postman or any API testing tool (optional).

Steps

    Clone the repository:

git clone https://github.com/roberag/blog-platform-backend.git
cd blog-platform-backend

Install dependencies:

npm install

Set up environment variables: Create a .env file in the root directory and add the following:

PORT=3000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

Start the server:

npm start

Run tests (optional):

    npm test

Example .env File

PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-platform
JWT_SECRET=mysecretkey

API Endpoints
Authentication

    POST /auth/register - Register a new user.
    POST /auth/login - Log in and get a JWT token.

User Profile

    GET /users/profile - Get the logged-in user’s profile.
    PUT /users/profile - Update the logged-in user’s profile.
    POST /users/:id/follow - Follow a user.
    POST /users/:id/unfollow - Unfollow a user.

Blogs

    POST /blogs - Create a new blog.
    GET /blogs - Get all blogs.
    GET /blogs/:id - Get a specific blog by ID.
    PUT /blogs/:id - Update a blog (only by the author).
    DELETE /blogs/:id - Delete a blog (only by the author).

Comments

    POST /blogs/:id/comments - Add a comment to a blog.
    PUT /blogs/:id/comments/:commentId - Edit a comment.
    DELETE /blogs/:id/comments/:commentId - Delete a comment.

Likes

    POST /blogs/:id/like - Like a blog.
    POST /blogs/:id/unlike - Unlike a blog.

Ratings

    POST /blogs/:id/rate - Rate a blog (1-5 scale).
    GET /blogs/:id/ratings - Get ratings and the average rating for a blog.

Search

    GET /search/users?query=<name> - Search for users.
    GET /search/blogs?query=<title> - Search for blogs.