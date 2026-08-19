const User = require("../models/User");

function home(req, res) {
  res.render("home", {
    title: "Home",
    error: req.query.error || null,
    success: req.query.success || null
  });
}

function registerPage(req, res) {
  res.render("register", {
    title: "Register",
    error: req.query.error || null
  });
}

function loginPage(req, res) {
  res.render("login", {
    title: "Login",
    error: req.query.error || null,
    success: req.query.success || null
  });
}

function dashboard(req, res) {
  res.render("dashboard", {
    title: "Dashboard"
  });
}

async function profile(req, res, next) {
  try {
    const user = await User.findById(req.session.user.id).select("-password");

    if (!user) {
      req.session.destroy(() => {});
      return res.redirect("/login?error=User%20account%20was%20not%20found.");
    }

    res.render("profile", {
      title: "Profile",
      user
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  home,
  registerPage,
  loginPage,
  dashboard,
  profile
};