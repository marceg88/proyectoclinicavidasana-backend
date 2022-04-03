const passport = require("passport")

const LocalStrategy = require("../utils/passport/local.strategy")
const JWTStrategy = require("../utils/passport/jwt.strategy")

passport.use(LocalStrategy)
passport.use(JWTStrategy)