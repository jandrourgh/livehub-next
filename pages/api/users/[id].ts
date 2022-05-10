import { IBand } from "interfaces/Band";
import { NextApiRequest, NextApiResponse } from "next"
import { Jwt, JwtPayload, verify} from 'jsonwebtoken'
import { IToken } from "interfaces/Token";
interface SingleUserResponse {
    bands: IBand[],
    role: string
}
interface SingleUserRequest {
    id: number
}
interface TestResponse {
    a: number
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TestResponse>
  ) {
      const { id } = req.query
      if(req.headers.authorization){
          const token = req.headers.authorization?.split(" ")[1]
          const verifiedToken: any= verify(token, "AAAAEEEEIIIIOOOOUUUU")
          console.log(verifiedToken)
          
          res.status(200).json({a: 1})
      } else {
          res.status(401).end()
    } 

  }
  