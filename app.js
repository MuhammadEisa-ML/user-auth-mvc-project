require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();

// Trust Vercel's proxy so secure cookies work properly
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-secret-2026",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

// Make current user available to EJS views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
app.use("/", pageRoutes);
app.use("/", authRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
    message: "The page you requested does not exist."
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).render("error", {
    title: "Server Error",
    message: "Something went wrong on the server."
  });
});

// Start server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel Serverless Functions
module.exports = app;