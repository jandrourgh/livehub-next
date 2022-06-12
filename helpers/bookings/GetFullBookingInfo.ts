import { getUserDataById } from "helpers/api/getUserDataById";
import { IBooking } from "interfaces/Booking";
import moment from "moment";
import { IUserProfile } from "interfaces/User";
import { generateTurns } from "./GenerateTurns";
import { getBandsByUserId } from "helpers/api/getBandsByUserId";


export const getFullBookingInfo = async (booking: IBooking) => {
    const messages = []
    const turns = generateTurns(booking.date)
    const userData = await getUserDataById(booking.uid)
    const bands = await getBandsByUserId(booking.uid)
    messages.push(`------- ${userData?.firstName} ${userData?.lastName} booked ${booking.turnsRequested.length} turn(s) for ${booking.date}-------`)
    booking.turnsRequested.map(turn=>{
        messages.push(`From ${moment(turns[turn].start).format("HH:mm ")} to ${moment(turns[turn].end).format("HH:mm")}`)
    })
    messages.push(`------Keys for streaming------`)
    bands.map(band=>{
        messages.push(`${band.id}`)
    })

    return {...booking, messages: messages};
}