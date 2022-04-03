const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');

const { ingresarUsuario } = require("../controllers/auth.controller")

router.post(
  "/ingreso",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8, max: 20}),
  passport.authenticate("local", { session: false, failWithError: true}),
  ingresarUsuario
)

module.exports = router