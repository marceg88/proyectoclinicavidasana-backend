const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

console.log(secret)

const ingresarUsuario = async (req ,res ,next) =>{
    console.log(req.user)
    if(req.user){
      const payload = {
        sub: req.user._id,
        email: req.user.email
      }
      const token = jwt.sign(payload, secret)
      console.log(token)
      res.status(201).json({
        message: "El usuario ingreso con exito",
        status: "OK",
        data: {
          id: req.user._id,
          name: req.user.name,
          lastName: req.user.lastName,
          dateBirth: req.user.dateBirth,
          idNumber: req.user.idNumber,
          idUser: req.user.idUser,
          token
        }
      })
    } else {
      res.status(503).json({
        message: "El usuario no pudo ingresar, intente más tarde",
        status: "Failed",
        data: {}
      })
    }
  }

module.exports = { ingresarUsuario }