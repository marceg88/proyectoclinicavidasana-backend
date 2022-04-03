const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const passport = require("passport")
const { generateCardToken, generateUserToken, makePayment, deleteCardToken } = require("../utils/payment/controllers")
const validateJWT = passport.authenticate("jwt", { session: false, failWithError: true })

router.post('/user',
  validateJWT,
  body('cardToken').isString(),
  body('name').isString(),
  body('lastName').isString(),
  body('email').isEmail().normalizeEmail(),
  body('city').isString(),
  body('address').isString(),
  body('phone').isString(),
  body('cellPhone').isString(),
  generateUserToken
);

router.post('/card',
  validateJWT,
  body('number').isString(),
  body('expYear').isString(),
  body('month').isString(),
  body('cvc').isString(),
  generateCardToken
);

router.post('/',
  validateJWT,
  body('cardToken').isString(),
  body('docType').isString(),
  body('docNumber').isString(),
  body('name').isString(),
  body('lastName').isString(),
  body('email').isEmail().normalizeEmail(),
  body('bill').isString(),
  body('description').isString(),
  body('value').isString(),
  body('tax').isString(),
  body('taxBase').isString(),
  body('currency').isString(),
  body('dues').isString(),
  body('ip').isString(),
  makePayment
)

router.delete('/', deleteCardToken )

module.exports = router;