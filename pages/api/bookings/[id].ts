import { getUserDataById } from "helpers/api/getUserDataById";
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { getFullBookingInfo } from "helpers/bookings/GetFullBookingInfo";
import { IBooking } from "interfaces/Booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const uid = getUidFromRequest(req)
    const user = await getUserDataById(uid)
    const {id} = req.query as {id: string}
    // const returnData = () => {

    // }
    if(user){
        const allBookings: IBooking[] = await getAllBookings()
        const thisBooking = allBookings.find(booking=>booking.id == parseInt(id))
        if(thisBooking){
            const fullBooking = getFullBookingInfo(thisBooking)
            if(user.role == 'user'){
                if(thisBooking?.uid === user.id) {
                    res.status(200).json({booking: fullBooking, type: "user"})    
                } else {
                    res.status(403).json({message: "This isn't your booking"})
                }
            } else if (['admin', 'employee'].includes(user.role)) {
                res.status(200).json({fullBooking, type: "admin"})
            } else {
                res.status(403).json({message: "Invalid user data"})
            }
        } else {
            res.status(404)
        }
    }
}
