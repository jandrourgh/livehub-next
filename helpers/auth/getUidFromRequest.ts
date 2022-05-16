import { Request } from "express";
import { IToken } from "interfaces/Token";
import { verify } from "jsonwebtoken";

export const getUidFromRequest =  (req: Request) => {
    const authHeader = req.headers.authorization;
    const tokenString = authHeader?.split(" ")[1];
    if (tokenString != undefined) {
      const token = verify(tokenString, "AAAAEEEEIIIIOOOOUUUU") as IToken;
      console.log(token);
      const uid = token.uid;
      return uid
    } else {
      throw "Invalid token";
    }
}
