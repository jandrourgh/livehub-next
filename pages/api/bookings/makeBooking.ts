import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { generateTurns } from "helpers/bookings/GenerateTurns";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { IBooking } from "interfaces/Booking";
import { getTakenTurns } from "helpers/bookings/GetTakenTurns"
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    const uid = getUidFromRequest(req)
    const requestBody: {
        turnsRequested: number[],
        date: string,
        room: number
    } = JSON.parse(req.body)
    const turns = generateTurns(requestBody.date)
    const booking = {
        ...requestBody,
        uid
    }
    const bookings:IBooking[] = await getAllBookings()
    const bookingsByDay = bookings.filter(booking=>booking.date == requestBody.date)
    const takenTurns = getTakenTurns(bookingsByDay)
    //console.log(takenTurns, booking.turnsRequested, " taken turns vs turns requested")
    const combination = takenTurns.filter(turn=>booking.turnsRequested.includes(turn))
    //console.log(combination, " combination of both")
    if(booking.turnsRequested.length && !combination.length){
        //console.log("se puede")
        //console.log(bookingsByDay, "BOOKINGS BY DAY")
        const bookingResponse = await fetch('http://localhost:3001/bookings', {
            method:"POST", 
            body: JSON.stringify(booking),
            headers: {"content-type": "application/json"}
        })
        res.status(200).json({message: "Booking Successful!"})
    } else {
        //console.log("no se puede")
        res.status(400).json({message: "Booking Invalid"})
    }
}
