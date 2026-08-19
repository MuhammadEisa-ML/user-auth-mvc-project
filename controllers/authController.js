const bcrypt = require("bcryptjs");
const User = require("../models/User");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function renderRegister(res, message = null) {
  res.render("register", {
    title: "Register",
    error: message
  });
}

async function register(req, res, next) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return renderRegister(res, "All fields are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      return renderRegister(res, "Please enter a valid email address.");
    }

    if (password.length < 6) {
      return renderRegister(res, "Password must contain at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return renderRegister(res, "Passwords do not match.");
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return renderRegister(res, "An account with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    res.redirect("/login?success=Account%20created.%20Please%20login.");
  } catch (error) {
    if (error.code === 11000) {
      return renderRegister(res, "An account with this email already exists.");
    }
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", {
        title: "Login",
        error: "Email and password are required."
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.render("login", {
        title: "Login",
        error: "Invalid email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.render("login", {
        title: "Login",
        error: "Invalid email or password."
      });
    }

    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    };

    req.session.save((err) => {
      if (err) return next(err);
      res.redirect("/dashboard");
    });
  } catch (error) {
    next(error);
  }
}

function logout(req, res, next) {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("connect.sid");
    res.redirect("/login?success=You%20have%20been%20logged%20out.");
  });
}

module.exports = { register, login, logout };