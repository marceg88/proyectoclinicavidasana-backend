const UsuariosServicios = require("../services/usuarios.service")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registrarUsuario = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }else{
    const { idUser, idNumber, name, lastName, dateBirth, email, password } = req.body
    const passwordEncrypted = await bcrypt.hash(password, 10)
    const existeUsuario = await UsuariosServicios.findByEmail(email)
    if(existeUsuario){
      res.status(403).json({
        message: "El correo ya esta registrado",
        status: "Failed",
        data: {}
      })
    }else{
      try {
        const nuevoUsuario = await UsuariosServicios.registro({ idUser, idNumber, name, lastName, dateBirth, email, password: passwordEncrypted})
        console.log(nuevoUsuario)
        res.status(200).json({
          message: "El usuario fue registrado con exito",
          status: "OK",
          data: {}
        })
      } catch (error) {
        res.status(403).json({
          message: "El usuario no pudo ser registrado",
          status: "Failed",
          data: error
        })
      }
    }
  }
}

const findUser = async (req, res, next) => {
  const { userId } = req.params
  try {
    const usuario = await UsuariosServicios.findById(userId)
    res.status(200).json({
      message: "El usuario fue encontrado con exito",
      status: "OK",
      data: usuario
    })
  } catch (error) {
    res.status.json({
      message: "El usuario no fue encontrado",
      status: "Failed",
      data: {}
    })
  }
}



module.exports = { registrarUsuario, findUser }