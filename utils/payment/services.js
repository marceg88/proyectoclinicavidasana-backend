const res = require("express/lib/response")

const apiKey = process.env.EPAYACO_SECRET
const privateKey = process.env.EPAYACO_KEY

const epayco = require("epayco-sdk-node")({
  apiKey: apiKey,
  privateKey: privateKey,
  lang: "ES",
  test: true
})

const registerCard = async (card) => {
  try {
    const cardRegistered = await epayco.token.create(card)
    if(!cardRegistered.status){
      res.status(503).json({
        message: cardRegistered.message,
      })
    }
    return { id: cardRegistered.id, card: cardRegistered.card }
  } catch (error) {
    return error
  }
}

const registerUser = async (user) => {
  try {
    const newUser = await epayco.users.create(user)
    if(newUser.status){
      return newUser.data.userId
    } else {
      res.status(503).json({
        message: newUser.message
      })
    }
  } catch (error) {
    return error
  }
}

const registerCardForUser = async (cardUser) => {
  try {
    const cardPushed = await epayco.users.addNewToken(cardUser)
    return cardPushed
  } catch (error) {
    return error
  }
}

const registerPayment = async (pay) => {
  try {
    const payment = await epayco.charge.create(pay)
    return payment
  } catch (error) {
    return error
  }
}

const deleteTokenCardToUser = async (user) => {
  try {
    const userDelete = await epayco.users.delete(user)
    return userDelete
  } catch (error) {
    return error
  }
}

module.exports = { registerCard, registerUser, registerCardForUser, registerPayment, deleteTokenCardToUser }