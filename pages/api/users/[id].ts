import { IBand } from "interfaces/Band";
import { NextApiRequest, NextApiResponse } from "next"
import { verify } from 'jsonwebtoken'
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
      console.log(id)
      console.log(req.headers.authorization)
    res.status(200).json({a: 1})
  }
  