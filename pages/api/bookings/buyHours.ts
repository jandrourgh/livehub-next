import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { NextApiRequest, NextApiResponse } from "next";
import { weekdays } from "moment"
import { IUser } from "interfaces/User";
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await cors(req, res)
    //console.log(req)
    const uid = getUidFromRequest(req)
    const data = JSON.parse(req.body)
    //console.log(`Usuario ${ uid } quiere comprar ${ data.hours} horas`)
    const userResponse = await fetch(`http://localhost:3001/users/${uid}` )
    const user: IUser = await userResponse.json()
    const hours = Math.floor(parseInt(data.hours))
    //console.log(user)
    if(user.hours!==undefined){
        user.hours = user.hours + hours
    } else {
        user.hours = hours
    }
    const updateUserResponse = await fetch(`http://localhost:3001/users/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    res.status(200).json({})
}