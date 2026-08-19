function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login?error=Please%20login%20to%20continue");
  }
  next();
}

module.exports = { requireAuth };