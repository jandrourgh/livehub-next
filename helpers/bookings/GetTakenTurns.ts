import { IBooking } from "interfaces/Booking"

export const getTakenTurns = (bookingsByDay: IBooking[]) =>{
    const takenTurns = bookingsByDay.map(booking=>{
        return booking.turnsRequested
    }).flat().filter((turn, i, array) => array.indexOf(turn)== i)
    return takenTurns
} 