import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { IRoom } from "interfaces/Room";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)

interface IRoomsResponse {
    rooms: IRoom[]
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IRoomsResponse>
){
    await cors(req, res)
    //const uid = getUidFromRequest(req)
    const getRoomsResponse = await fetch("http://localhost:3001/rooms")
    const rooms: IRoom[] = await getRoomsResponse.json()
    res.status(200).json({rooms: rooms})
}