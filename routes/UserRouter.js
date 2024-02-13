const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.taskwiz;
const bcrypt = require("bcryptjs");
const passport = require("passport");

// route for rendering the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// route for handling user login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

// route for rendering the registration page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // check if all fields are provided
  if (!name || !email || !password) {
      req.flash('error_msg', 'All fields are required.');
  }

  const errorMsg = req.flash('error_msg');

  if (errorMsg.length) {
      return res.render('register', {
          name,
          email,
          password,
          error_msg: errorMsg,
      });
  }

  try {
      const user = await User?.findOne({ where: { email } });

      if (user) {
          req.flash('error_msg', 'User already exists');
          return res.render('register', {
              name,
              email,
              password,
              error_msg: req.flash('error_msg'),
          });
      }

      // hash the password & create a new user
      const hashedPassword = await bcrypt.hash(password, 10);

      await User?.create({
          name,
          email,
          password: hashedPassword,
      });

      res.redirect('/');
  } catch (error) {
      console.error(error);
  }
});

// route for user logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logout Successfully");
  res.redirect("/users/login");
});

module.exports = router;