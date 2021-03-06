import { IBand } from "interfaces/Band";
import { NextApiRequest, NextApiResponse } from "next"
import { verify} from 'jsonwebtoken'
import { IToken } from "interfaces/Token";
import { IUser, IUserProfile } from "interfaces/User";
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
    userData:IUserProfile,
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
    res: NextApiResponse
  ) {
        await cors(req, res)
        //console.log(req.body, "play")
        res.status(200).json({})

    } 


  