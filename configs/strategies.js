import passportJWT from "passport-jwt";
import Users from "../models/users.js";
import config from "./config.js";

export const jwtStrategy = new passportJWT.Strategy(
  {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  },
  async (payload, done) => {
    console.log("Strategy check payload ", payload);
    const user = await Users.findById(payload.id).exec();

    console.log("Strategy check user ", user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  },
);
