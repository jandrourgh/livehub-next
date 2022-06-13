import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { IBooking } from "interfaces/Booking";
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
    const allBookings: IBooking[] = await getAllBookings()
    const userBookings = allBookings.filter(booking=>booking.uid == uid)
    res.status(200).json(userBookings)
}
