import { getUserDataById } from "helpers/api/getUserDataById";
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { IBooking } from "interfaces/Booking";
import { IEmployee, IUser } from "interfaces/User";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await cors(req, res)
    const uid = getUidFromRequest(req)
    //console.log(uid, "UID")
    const userData = await getUserDataById(uid) as IEmployee
    //console.log(userData.worksAt, "worksat")
    const allBookings: IBooking[] = await getAllBookings()
    //console.log(allBookings)
    const userBookings = allBookings.filter(booking=>booking.room == userData.worksAt)
    //console.log(userBookings)
    res.status(200).json(userBookings)
}
