import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { IRoom } from "interfaces/Room";
import { NextApiRequest, NextApiResponse } from "next";

interface IRoomsResponse {
    rooms: IRoom[]
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IRoomsResponse>
){
    const uid = getUidFromRequest(req)
    const getRoomsResponse = await fetch("http://localhost:3001/rooms")
    const rooms: IRoom[] = await getRoomsResponse.json()
    res.status(200).json({rooms: rooms})
}