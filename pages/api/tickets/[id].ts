import { getUserDataById } from "helpers/api/getUserDataById";
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { getFullBookingInfo } from "helpers/bookings/GetFullBookingInfo";
import { IBooking, ITicket } from "interfaces/Booking";
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
    const user = await getUserDataById(uid)
    const {id} = req.query as {id: string}

    if(user){
        const allBookings: IBooking[] = await getAllBookings()
        const thisBooking = allBookings.find(booking=>booking.id == parseInt(id))
        if(thisBooking){
            if(user.role == 'user'){
                if(thisBooking?.uid === user.id) {
                    const tickets = thisBooking.tickets?thisBooking.tickets:[]
                    const newTicket: ITicket = {sender:"user", body:req.body}
                    tickets.push(newTicket)
                    const newBooking = {...thisBooking, tickets: tickets}
                    const updateBookingResponse = await fetch(`http://localhost:3001/bookings/${id}`, {
                        method: "PUT",
                        headers: {'Content-Type': "application/json"},
                        body: JSON.stringify(newBooking)
                    })
                    res.status(200).json({})    
                } else {
                    res.status(403).json({message: "This isn't your booking"})
                }
            } else if (['admin', 'employee'].includes(user.role)) {
                const tickets = thisBooking.tickets?thisBooking.tickets:[]
                    const newTicket: ITicket = {sender:"admin", body:req.body}
                    tickets.push(newTicket)
                    const newBooking = {...thisBooking, tickets: tickets}
                    const updateBookingResponse = await fetch(`http://localhost:3001/bookings/${id}`, {
                        method: "PUT",
                        headers: {'Content-Type': "application/json"},
                        body: JSON.stringify(newBooking)
                    })
                    res.status(200).json({})  
            } else {
                res.status(403).json({message: "Invalid user data"})
            }
        } else {
            res.status(404)
        }
    }
}
