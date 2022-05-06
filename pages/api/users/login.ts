import { IUser, IUserAuthResponse, IUserLogin } from 'interfaces/User'
import {sign} from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.method, req.body)
  const requestUser: IUserLogin = JSON.parse(req.body)
  const users: IUser[] = await(fetch('http://localhost:3001/users')).then(data=>data.json())
  const found = users.find((user)=> (user.email === requestUser.email 
      && user.password === requestUser.password))
  console.log("ENCONTRADO", found)
  if(found!=undefined){
    const token = sign({ sub: found.id }, "AAAAEEEEIIIIOOOOUUUU", { expiresIn: '7d' });

    const response :IUserAuthResponse = {firstName: found.firstName, lastName: found.lastName, id: found.id, userName: found.userName, token}
    res.status(200).json({name: "response", ...response})
  } else {
    res.status(500)
  }
}
