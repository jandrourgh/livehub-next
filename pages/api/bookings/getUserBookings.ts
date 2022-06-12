import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { IBooking } from "interfaces/Booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const uid = getUidFromRequest(req)
    //console.log(uid, "UID")
    const allBookings: IBooking[] = await getAllBookings()
    const userBookings = allBookings.filter(booking=>booking.uid == uid)
    res.status(200).json(userBookings)
}
