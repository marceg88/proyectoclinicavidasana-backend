const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const { registrarUsuario, findUser } = require("../controllers/usuarios.controller")
const passport = require("passport")
const { findServiceByPatient } = require("../controllers/servicios.controller")
const validateJWT = passport.authenticate("jwt", {session: false, failWithError: true})

router.get(
  "/:userId",
  validateJWT,
  findUser
)

router.get(
  "/:userId/servicios",
  validateJWT,
  findServiceByPatient
)

router.post(
  "/",
  body("name").notEmpty(),
  body("lastName").notEmpty(),
  body("idUser").notEmpty(),
  body("idNumber").isLength({ min: 5, max: 12 }),
  body("dateBirth").isDate(),
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 20}),
  registrarUsuario
)

module.exports = router