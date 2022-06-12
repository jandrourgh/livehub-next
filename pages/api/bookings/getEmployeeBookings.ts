import { getUserDataById } from "helpers/api/getUserDataById";
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { IBooking } from "interfaces/Booking";
import { IEmployee, IUser } from "interfaces/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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
