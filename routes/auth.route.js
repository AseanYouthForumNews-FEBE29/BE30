const express = require("express");
const { check, validationResult } = require("express-validator");
const multer = require("multer");

const authRouter = express.Router();

const { register, login, /* logout */ } = require("../controllers/auth.controller");

authRouter.post(
  "/register",
  multer().single("image"),
  [
    check("email").isEmail().withMessage("Invalid Email Address"),

    check("password")
      .isLength({ min: 8 })
      .withMessage("Password Length Minimum 8 Characters"),

    check("fullName")
      .isLength({ min: 1 })
      .withMessage("Full Name Must Not Empty"),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  register
);

authRouter.post("/login", login);

// authRouter.delete("/logout", logout);

module.exports = authRouter;
