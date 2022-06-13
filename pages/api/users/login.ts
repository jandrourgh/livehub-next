import { IUser, IUserAuthResponse, IUserLogin, } from 'interfaces/User'
import {sign} from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'helpers/api/getToken'
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserAuthResponse>
) {
  await cors(req, res)
  //console.log(req.method, req.body)
  const requestUser: IUserLogin = JSON.parse(req.body)
  const users: IUser[] = await (fetch('http://localhost:3001/users')).then(data=>data.json())
  const found = users.find((user)=> (user.email === requestUser.email 
      && user.password === requestUser.password))
  //console.log(found)
  if(found!=undefined){
    const token = getToken(found)
    const response :IUserAuthResponse = {firstName: found.firstName, lastName: found.lastName, id: found.id, userName: found.userName, token}
    res.status(200).json(response)
  } else {
    //console.log("erroraso")
    res.status(401).end()
  }
}
