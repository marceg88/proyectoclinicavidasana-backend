const customers = require("epayco-sdk-node/lib/resources/customers")
const Usuario = require("../models/usuarios.schema")

const UsuariosServicios = {
  async registro(usuario){
    try {
      const nuevoUsuario = new Usuario(usuario)
      await nuevoUsuario.save()
      return nuevoUsuario
    } catch (error) {
      return error 
    }
  },
  async findByEmail(email){
    try {
      const usuario = await Usuario.findOne({email})
      console.log("usuario",usuario)
      return usuario
    } catch (error) {
      return error
    }
  },
  async findById(id){
    try {
      const existUser = await Usuario.findById(id)
      return existUser
    } catch (error) {
      return error
    }
  },
  async addUserPaymentId(id, paymentId){
    try {
      const user = await Usuario.findById(id)
      user.user_payment_id = paymentId
      const userUpdated = await user.save()
      return userUpdated
    } catch (error) {
      return error
    }
  },
  async addCard(id, card){
    try {
      const user = await Usuario.findById(id)
      if(!user.cards || !user.cards.length ) user.cards = [card]
      else user.cards.push(card)
      const userUpdated = await user.save()
      return userUpdated
    } catch (error) {
      return error
    }
  },
  async addPayment(id, payment){
    try {
      const user = await Usuario.findById(id)
      if(!user.payments || !user.payments.length ) user.payment = [payment]
      else user.payments.push(payment)
      const userUpdated = await user.save()
      return userUpdated
    } catch (error) {
      return error
    }
  },
  async deleteCard(id){
    try {
      const user = await Usuario.findById(id)
      customers.cards = []
      const userUpdated = await user.save()
      return userUpdated
    } catch (error) {
      return error
    }
  }
}

module.exports = UsuariosServicios