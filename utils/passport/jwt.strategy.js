const { Strategy, ExtractJwt } = require("passport-jwt")

const secret = process.env.JWT_SECRET 

//Se extrae el jwt del header
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

//Creamos la estrategia para validar el jwt
const JWTStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload)
})

module.exports = JWTStrategy