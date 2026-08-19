# User Authentication Web Application — MVC

This project implements Web Technologies Assignment No. 03 using Node.js, Express.js, MongoDB, HTML/CSS/EJS and JavaScript.

## Features
- Register
- Login
- bcrypt password hashing
- MongoDB user storage
- Session-based authentication
- Protected Dashboard
- Protected Profile
- Logout
- 404 and server-error pages
- MVC architecture
- Custom authentication middleware
- Environment variables

## 1. Requirements
Install:
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git/GitHub account
- Vercel account





## 2. MongoDB Atlas
1. Create a free MongoDB Atlas cluster.
2. Create a database user.
3. In Network Access, allow your development IP. For a simple student deployment, you may temporarily allow `0.0.0.0/0`, but use a strong database password and restrict access when possible.
4. Copy the application connection string.
5. Put it in `.env` as `MONGODB_URI`.

Do NOT commit `.env`.

## 3. MVC Flow

Browser
  -> Route
  -> Middleware
  -> Controller
  -> Model
  -> MongoDB

Examples:
- POST `/register` -> auth route -> register controller -> User model -> MongoDB
- POST `/login` -> login controller -> User model -> bcrypt verification -> session
- GET `/dashboard` -> requireAuth middleware -> dashboard controller -> EJS view

## 4. Main Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Home |
| GET | `/register` | Registration form |
| POST | `/register` | Create user |
| GET | `/login` | Login form |
| POST | `/login` | Authenticate |
| GET | `/dashboard` | Protected dashboard |
| GET | `/profile` | Protected profile |
| POST | `/logout` | Logout |

## 5. GitHub

```bash
git init
git add .
git commit -m "Assignment 03 - MVC authentication app"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 6. Vercel

The application includes `vercel.json` for Vercel deployment. Import the GitHub repository into Vercel and add the same environment variables:

- `MONGODB_URI`
- `SESSION_SECRET`
- `NODE_ENV=production`

After deployment, test register, login, dashboard, profile and logout.


