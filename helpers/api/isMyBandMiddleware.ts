import {expressjwt} from "express-jwt"

export const isMyBandMiddleware = expressjwt({
    secret: "AAAAEEEEIIIIOOOOUUUU",
    algorithms: ["ES256"]

})