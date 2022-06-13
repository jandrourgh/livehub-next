import { getRoomByEmployeeId } from 'helpers/api/getRoomByEmployeeId'
import { getUidFromRequest } from 'helpers/auth/getUidFromRequest'
import { IRoom } from 'interfaces/Room'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)

type Data = {
  room: IRoom
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await cors(req, res)
  //console.log(req.body)
  //console.log(req.headers)
  const userId = getUidFromRequest(req)
  //console.log(req.headers.authorization)
  //console.log(userId)
  const roomRequest = JSON.parse(req.body) as IRoom
  //console.log(roomRequest, "-----request")
  const room = await getRoomByEmployeeId(userId)
  //console.log(room)
  if(room){
      const updateRoomDBResponse = fetch(`http://localhost:3001/rooms/${room.id}`, {
          method:"PUT",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({equipment: roomRequest.equipment, address: roomRequest.address, until: roomRequest.openUntil })
      })
      
  }
  res.status(200).json({room: roomRequest})
}
