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

git clone https://github.com/robahunter/blogpost_backend.git

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

API Documentation
Authentication
POST /api/users/register

    Description: Register a new user.
    Request Body:

{
  "username": "john",
  "email": "johndoe@example.com",
  "password": "securePassword123"
}

Response:

    {
      "message": "User registered successfully",
      "token": "JWT_TOKEN"
    }

POST /api/users/login

    Description: Log in and get a JWT token.
    Request Body:

{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}

Response:

    {
      "message": "Login successful",
      "token": "JWT_TOKEN"
    }

User Profile
GET /api/users/me

    Description: Get the logged-in user’s profile (Protected).
    Authorization: Bearer token in the header
    Response:

    {
      "user": {
        "id": "USER_ID",
        "username": "john",
        "email": "johndoe@example.com"
      }
    }

PUT /api/users/me

    Description: Update the logged-in user’s profile (Protected).
    Authorization: Bearer token in the header
    Request Body:

{
  "username": "john_updated",
  "email": "newemail@example.com"
}

Response:

    {
      "message": "Profile updated successfully"
    }

DELETE /api/users/me

    Description: Delete the logged-in user’s profile (Protected).
    Authorization: Bearer token in the header
    Response:

    {
      "message": "User deleted successfully"
    }

Blogs
POST /api/posts

    Description: Create a new blog (Protected).
    Authorization: Bearer token in the header
    Request Body:

{
  "title": "My First Blog",
  "content": "This is the content of my first blog post."
}

Response:

    {
      "message": "Blog created successfully",
      "blog": {
        "id": "BLOG_ID",
        "title": "My First Blog",
        "content": "This is the content of my first blog post."
      }
    }

GET /api/posts

    Description: Get all blogs.
    Response:

    [
      {
        "id": "BLOG_ID",
        "title": "My First Blog",
        "content": "This is the content of my first blog post."
      },
      {
        "id": "BLOG_ID_2",
        "title": "Another Blog",
        "content": "This is another blog content."
      }
    ]

GET /api/posts/:id

    Description: Get a specific blog by ID.
    Response:

    {
      "id": "BLOG_ID",
      "title": "My First Blog",
      "content": "This is the content of my first blog post."
    }

PUT /api/posts/:id

    Description: Update a blog (only by the author) (Protected).
    Authorization: Bearer token in the header
    Request Body:

{
  "title": "Updated Blog Title",
  "content": "Updated content for the blog."
}

Response:

    {
      "message": "Blog updated successfully"
    }

DELETE /api/posts/:id

    Description: Delete a blog (only by the author) (Protected).
    Authorization: Bearer token in the header
    Response:

    {
      "message": "Blog deleted successfully"
    }

Comments
POST /api/posts/:id/comments

    Description: Add a comment to a blog (Protected).
    Authorization: Bearer token in the header
    Request Body:

{
  "content": "This is a comment on the blog."
}

Response:

    {
      "message": "Comment added successfully",
      "comment": {
        "id": "COMMENT_ID",
        "content": "This is a comment on the blog."
      }
    }

PUT /api/posts/:id/comments/:commentId

    Description: Edit a comment (Protected).
    Authorization: Bearer token in the header
    Request Body:

{
  "content": "This is the updated comment."
}

Response:

    {
      "message": "Comment updated successfully"
    }

DELETE /api/posts/:id/comments/:commentId

    Description: Delete a comment (Protected).
    Authorization: Bearer token in the header
    Response:

    {
      "message": "Comment deleted successfully"
    }

Likes
POST /api/posts/:id/like

    Description: Like a blog (Protected).
    Authorization: Bearer token in the header
    Response:

    {
      "message": "Blog liked successfully"
    }

POST /api/posts/:id/unlike

    Description: Unlike a blog (Protected).
    Authorization: Bearer token in the header
    Response:

    {
      "message": "Blog unliked successfully"
    }

Ratings
POST /api/posts/:id/rate

    Description: Rate a blog (1-5 scale) (Protected).
    Authorization: Bearer token in the header
    Request Body:

{
  "rating": 4
}

Response:

    {
      "message": "Blog rated successfully"
    }

GET /api/posts/:id/ratings

    Description: Get ratings and the average rating for a blog.
    Response:

    {
      "ratings": [
        {
          "user": "USER_ID",
          "rating": 4
        },
        {
          "user": "USER_ID_2",
          "rating": 5
        }
      ],
      "averageRating": 4.5
    }

Search
GET /api/search/users?query=<name>

    Description: Search for users by name.
    Response:

    [
      {
        "id": "USER_ID",
        "username": "john",
        "email": "johndoe@example.com"
      },
      {
        "id": "USER_ID_2",
        "username": "jane",
        "email": "janedoe@example.com"
      }
    ]

GET /api/search/blogs?query=<title>

    Description: Search for blogs by title.
    Response:

[
  {
    "id": "BLOG_ID",
    "title": "My First Blog",
    "content": "This is the content of my first blog post."
  },
  {
    "id": "BLOG_ID_2",
    "title": "Another Blog",
    "content": "This is another blog content."
  }
]