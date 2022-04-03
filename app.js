require("dotenv").config()
const express = require("express")
const http = require("http")
const { connectToDb } = require('./config/database')
const passport = require("passport")

const port = process.env.PORT

const app = express()

connectToDb()

app.use(express.json());

//inicializar passport
require("./utils/index")
app.use(passport.initialize())

const routes = require("./routes/index")
app.use("/", routes)

const server = http.createServer(app)

server.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`))
