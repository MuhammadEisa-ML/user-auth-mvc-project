const express = require("express");
const router = express.Router();

const {
  home,
  registerPage,
  loginPage,
  dashboard,
  profile
} = require("../controllers/pageController");

const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", home);
router.get("/register", registerPage);
router.get("/login", loginPage);
router.get("/dashboard", requireAuth, dashboard);
router.get("/profile", requireAuth, profile);

module.exports = router;