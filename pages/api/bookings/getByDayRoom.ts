import { generateTurns } from "helpers/bookings/GenerateTurns";
import { getAllBookings } from "helpers/bookings/GetAllBookints";
import { getTakenTurns } from "helpers/bookings/GetTakenTurns";
import { IBooking } from "interfaces/Booking";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const request = JSON.parse(req.body) as { date: string; room: number };

    if (request.room >= 0) {
        const allBookings:IBooking[] = await getAllBookings()
        const bookingsByDay = allBookings.filter(booking=>booking.date == request.date)
        const takenTurns=getTakenTurns(bookingsByDay)
        const turns = generateTurns(request.date)
        takenTurns.forEach(turn=>{
            turns[turn].available = false;
        })
        res.status(200).json(turns);
    } else {
        res.status(400).json({ message: "bad request" });
    }
}
