const { Strategy } = require("passport-local")
const bcrypt = require("bcrypt")

const UsuariosServicios = require("../../services/usuarios.service")

const LocalStrategy = new Strategy(
    { usernameField: "email", passwordField: "password" },
    async ( email, password, done ) => {
        console.log(email)
        try {
            const user = await UsuariosServicios.findByEmail(email)
            
            if(!user){
                console.log("entra",user)
                return done({message: "Correo o contraseña incorrectos"}, false)
            } else if(user){
                const isEqual = await bcrypt.compare(password, user.password)
                if(isEqual){
                    done(null, user)
                } else {
                    return done({message: "Correo o contraseña incorrectos"}, false)
                }
            } 
            else {
                return done({ message: 'Email or password incorrect. Please try again.' }, false)
            }
        } catch (error) {
            return done({error, message: "El usuario no pudo ingresar, por favor intente más tarde"}, false)
        }
    }
)

module.exports = LocalStrategy