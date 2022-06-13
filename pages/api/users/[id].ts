import { IBand } from "interfaces/Band";
import { NextApiRequest, NextApiResponse } from "next"
import { verify} from 'jsonwebtoken'
import { IToken } from "interfaces/Token";
import { IEmployee, IUser, IUserProfile } from "interfaces/User";
import { getBandsByUserId } from "helpers/api/getBandsByUserId";
import { getRoomByEmployeeId } from "helpers/api/getRoomByEmployeeId";
import { IRoom } from "interfaces/Room";
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)
interface SingleUserResponse {
    bands?: IBand[],
    role: string,
    userData:IUserProfile|IEmployee,
    roomData?: IRoom
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
      await cors(req, res)
      const { id } = req.query
      if(req.headers.authorization){
          const token = req.headers.authorization?.split(" ")[1]
          const verifiedToken = verify(token, "AAAAEEEEIIIIOOOOUUUU") as IToken
          const response = await fetch(`http://localhost:3001/users/${verifiedToken.uid}`)
          const userData: IUser|IEmployee = await response.json()
          switch(req.method){
            case 'GET':
                switch(userData.role){
                    case "user":
                        //console.log("quiero tu info y las de tus bandas")
                        // eslint-disable-next-line 
                        let bands = await getBandsByUserId(userData.id)
                        //console.log("tengo las bandas", bands)
                        res.status(200).json({
                            userData: {firstName: userData.firstName, id: userData.id, lastName: userData.lastName, userName:userData.userName, email:userData.email,hours: userData.hours},
                            bands: bands,
                            role: 'user'
                        })
                        break;
                    case "employee":
                        //console.log("quiero tu info, la del local donde trabajas y sus reservas")
                        /* eslint-disable  */
                        let room = await getRoomByEmployeeId(userData.id)
                        let adminData = userData as IEmployee;
                        /* eslint-enable  */
                        res.status(200).json({
                            userData: {email: adminData.email, firstName: adminData.firstName, id: adminData.id, lastName: adminData.lastName, userName: adminData.userName, worksAt:adminData.worksAt },
                            roomData: room,
                            role: 'employee'
                        })
                        break;
                    case "admin":
                        //console.log("quiero toda la info de la bd")
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
  