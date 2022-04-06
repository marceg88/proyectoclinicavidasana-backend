const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const passport = require("passport")
const { registrarServicio, findServiceById, editServices, deleteService } = require("../controllers/servicios.controller")

const validateJWT = passport.authenticate("jwt", {session: false, failWithError: true})

router.get(
  "/:serviceId",
  // validateJWT,
  findServiceById
)

router.post(
  "/",
  // validateJWT,
  body("nameService").notEmpty(),
  body("dateService").toDate(),
  body("price").isLength({ min: 2 }),
  body("patient").notEmpty(),
  registrarServicio
)

router.put(
  "/:serviceId",
  // validateJWT,
  body("nameService").notEmpty(),
  body("dateService").toDate(),
  body("price").isLength({ min: 2 }),
  editServices
)

router.delete(
  "/:serviceId",
  // validateJWT,
  deleteService
)

module.exports = router