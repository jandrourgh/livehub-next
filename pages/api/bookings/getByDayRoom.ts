import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const request = JSON.parse(req.body) as {date:string, room:number}
    
    if(request.room>=0){
        console.log(req.body)
        const allBookingsResponse = await fetch('http://localhost:3001/bookings')
        const allBookings = await allBookingsResponse.json()
        console.log(allBookings)

        const openingTime= "09:00"
        const sessionDurationMinutes = 60
        const restDurationMinutes = 10
        const closingTime= "22:00"
        let currentDate = moment(request.date + ' ' + openingTime)
        let turns = []
        let index = 0;
        while(moment(currentDate).isBefore(moment(request.date + ' ' + closingTime).subtract(sessionDurationMinutes, 'minutes'))){
            let start = currentDate
            let end = moment(currentDate).add(sessionDurationMinutes, 'minutes')
            turns.push({
                start: start.format(),
                end: end.format(),
                available: true,
                turnId: index++
            })
            currentDate = moment(end).add(restDurationMinutes, 'minutes')
        }
        console.log(turns, turns.length)
        res.status(200).json(turns)
    } else {
        res.status(400).json({message: "bad request"})
    }
}