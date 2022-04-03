const express = require('express')
const app = express()

const usuariosRoutes = require("./usuarios.routes")
const tokenRoutes = require("./token.routes")
const servicioRoutes = require("./servicio.routes")
const paymentRoutes = require("./payment.routes")

app.use("/usuarios", usuariosRoutes)
app.use("/auth", tokenRoutes)
app.use("/servicios", servicioRoutes)
app.use("/pagos", paymentRoutes)

module.exports = app