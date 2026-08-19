# Assignment 03 Report Guide

## Title
User Authentication Web Application Using Node.js, Express.js, MongoDB and MVC

## 1. Introduction
Explain that the application provides registration, login, protected dashboard/profile pages and logout.

## 2. Technologies
- Node.js
- Express.js
- MongoDB/Mongoose
- EJS
- HTML/CSS
- JavaScript
- bcryptjs
- express-session
- Vercel

## 3. MVC Architecture
Explain:
- Model: `models/User.js`
- View: `views/*.ejs`
- Controller: `controllers/*.js`
- Routes: `routes/*.js`
- Middleware: `middleware/authMiddleware.js`

## 4. Authentication Flow
Registration:
User -> POST /register -> Controller -> validation -> check email -> bcrypt hash -> User model -> MongoDB

Login:
User -> POST /login -> Controller -> find user -> bcrypt compare -> session -> dashboard

Protected page:
Browser -> requireAuth middleware -> session check -> dashboard/profile

## 5. Security
Mention:
- Password hashing using bcrypt
- `.env` for secrets
- `.gitignore` prevents `.env` upload
- Authentication middleware
- Input validation
- HTTP-only session cookie

## 6. Screenshots
Add screenshots from your own running/deployed application:
1. Home
2. Register
3. Login
4. Dashboard
5. Profile
6. MongoDB
7. GitHub
8. Vercel

## 7. Testing Table

| Test | Expected | Result |
|---|---|---|
| Valid registration | User created | Pass |
| Duplicate email | Error shown | Pass |
| Password mismatch | Error shown | Pass |
| Invalid login | Error shown | Pass |
| Valid login | Dashboard opens | Pass |
| Dashboard without login | Redirect to login | Pass |
| Profile without login | Redirect to login | Pass |
| Logout | Session ends | Pass |
| Unknown URL | 404 page | Pass |

## 8. Conclusion
State that the project demonstrates a complete MVC authentication workflow using Express and MongoDB.