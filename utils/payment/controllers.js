const UsuariosServicios = require("../../services/usuarios.service")
const { validationResult } = require('express-validator')
const { registerCard, registerCardForUser, registerPayment, registerUser, deleteTokenCardToUser } = require("./services")

const defineUser = (userData) => {
  const { cardToken, name, lastName, email, city, address, phone, cellPhone } = userData

  const user = {
    token_card: cardToken,
    name: name,
    last_name: lastName,
    email: email,
    default: true
  } 
  city ? user.city = city : null
  address ? user.address = address : null
  phone ? user.phone = phone : null
  cellPhone ? user.cell_phone = cellPhone : null

  return user
}

const addCardToUser = async (cardData) => {
  const cardPushed = await registerCardForUser(cardData)
}

const generateCardToken = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors)
  }
  const { number, expYear, month, cvc, userId } = req.body
  const card = {
    "card[number]": number,
    "card[exp_year]": expYear,
    "card[exp_month]": month,
    "card[cvc]": cvc
  }
  try {
    const cardToken = await registerCard(card)
    await UsuariosServicios.addCard(userId, cardToken)
    if(req.body.userPaymentId){
      const cardData = { token_card: cardToken.id, user_id: req.body.userPaymentId }
      await addCardToUser(cardData)
    }
    res.status(200).json({
      message: "La tarjeta fue registrada exitosamente",
      status: "OK",
      data: cardToken
    })
  } catch (error) {
    res.status(400).json({
      message: "La tarjeta no pudo ser registrada",
      status: "Failed",
      data: {}
    })
  }
}

const generateUserToken = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors)
  };
  const user = defineUser(req.body)
  try {
    const userToken = await registerUser(user)
    await UsuariosServicios.addUserPaymentId(userId, userToken)
    res.status(200).json({
      message: "El usuario se registro correctamente",
      status: "OK",
      data: { userToken }
    })
  } catch (error) {
    res.status(400).json({
      message: "El usuario no pudo ser registrado",
      status: "Failed",
      data: error
    })
  }
}

const makePayment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors)
  };
  const { userId, cardToken, bill, description, docType, docNumber, value, name, lastName, tax, taxBase, email, currency, dues, ip } = req.body;

  const payment = {
    token_card: cardToken,
    doc_type: docType,
    doc_number: docNumber,
    name,
    last_name: lastName,
    email,
    bill,
    description,
    value,
    tax,
    tax_base: taxBase,
    currency,
    dues,
    ip
  }
  if(!req.body.userPaymentId){
    const user = defineUser({ cardToken, name, lastName, email })
    const userToken = await registerUser(user)
    await UsuariosServicios.addUserPaymentId(userId, userToken)
    payment.user_id = userToken
  } else {
    payment.user_id = req.body.userPaymentId
  }
  try {
    const paymentRegistered = await registerPayment(payment)
    await UsuariosServicios.addPayment(userId, paymentRegistered.data)
    res.status(200).json({
      message: "El pago fue registrado",
      status: "OK",
      data: paymentRegistered.data
    })
  } catch (error) {
    res.status(400).json({
      message: "El pago no fue registrado",
      status: "Failed",
      data: error
    })
  } 
}

const deleteCardToken = async (req, res, next) => {
  const { userPaymentId, userId } = req.body;

  var delete_user_info = {
    franchise : "visa",
    mask : "457562******0326",
    customer_id: userPaymentId
  }
  try {
    const cardDeleted = await deleteTokenCardToUser(delete_user_info);
    await UsuariosServicios.deleteCard(userId)
    res.status(201).json({
      message: 'La tarjeta fue eliminada.',
      status: "OK",
      data: {}
    })
  } catch (error) {
    res.status(400).json({
      message: "La tarjeta no pudo ser eliminada",
      status: "Failed",
      data: {}
    })
  } 
}

module.exports = { generateCardToken, generateUserToken, makePayment, deleteCardToken }