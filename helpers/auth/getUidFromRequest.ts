import { Request } from "express";
import { IToken } from "interfaces/Token";
import { verify } from "jsonwebtoken";
import { NextApiRequest } from "next";

export const getUidFromRequest =  (req: Request | NextApiRequest) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
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
