import { getToken } from 'helpers/api/getToken'
import { IUser, IUserAuthResponse, IUserRegister, IUserSave } from 'interfaces/User'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserAuthResponse>
) {
    const userRequest: IUserRegister = req.body
    const userToRegister: IUserSave = {
      email: userRequest.email,
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
      password: userRequest.password,
      role: 'user',
      userName: userRequest.userName
    }
    const response = await fetch('http://localhost:3001/users', {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userToRegister)
    })
    //console.log(response)
    const data: IUser = await response.json()
    const registerResponse: IUserAuthResponse = {
      firstName: data.email,
      lastName: data.lastName,
      id: data.id,
      token: getToken(data),
      userName: data.userName
    }
    res.status(200).json(registerResponse);
}
