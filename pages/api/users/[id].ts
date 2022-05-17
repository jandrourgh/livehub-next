import { IBand } from "interfaces/Band";
import { NextApiRequest, NextApiResponse } from "next"
import { verify} from 'jsonwebtoken'
import { IToken } from "interfaces/Token";
import { IUser, IUserProfile } from "interfaces/User";
import { getBandsByUserId } from "helpers/api/getBandsByUserId";
interface SingleUserResponse {
    bands?: IBand[],
    role: string,
    userData:IUserProfile
}
interface SingleUserRequest {
    id: number
}
interface TestResponse {
    a: number
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SingleUserResponse>
  ) {
      const { id } = req.query
      if(req.headers.authorization){
          const token = req.headers.authorization?.split(" ")[1]
          const verifiedToken = verify(token, "AAAAEEEEIIIIOOOOUUUU") as IToken
          const response = await fetch(`http://localhost:3001/users/${verifiedToken.uid}`)
          const userData: IUser = await response.json()
          switch(req.method){
            case 'GET':
                switch(userData.role){
                    case "user":
                        console.log("quiero tu info y las de tus bandas")
                        const bands = await getBandsByUserId(userData.id)
                        console.log("tengo las bandas", bands)
                        res.status(200).json({
                            userData: {firstName: userData.firstName, id: userData.id, lastName: userData.lastName, userName:userData.userName, email:userData.email},
                            bands: bands,
                            role: 'user'
                        })
                        break;
                    case "employee":
                        console.log("quiero tu info, la de los locales donde trabajas y sus reservas")
                        res.status(200).json({
                            userData: {email: userData.email, firstName: userData.email, id: userData.id, lastName: userData.lastName, userName: userData.userName},
                            role: 'employee'
                        })
                        break;
                    case "admin":
                        console.log("quiero toda la info de la bd")
                        break;
                }
                break;
            case 'POST':
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
          }
          
      } else {
          res.status(401).end()
    } 

  }
  