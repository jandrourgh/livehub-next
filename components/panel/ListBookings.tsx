import { generateTurns } from "helpers/bookings/GenerateTurns";
import { IBooking, ITurn } from "interfaces/Booking";
import moment, { Moment } from "moment";
import { useEffect } from "react";

const ListBookings = ({ bookings }: { bookings: IBooking[]}) => {
    
    const turns = generateTurns(moment().format('YYYY-MM-DD'))
    console.log(turns)

    const printTurn = (turn: ITurn) => {
        const startTime = moment(turn.start).format('HH:mm')
        const endTime = moment(turn.end).format('HH:mm')
        return `From ${startTime} to ${endTime}`
    }

    const printReadable = (booking: IBooking) => {
        console.log(booking)
        const momentDate = moment(booking.date)
        const year = momentDate.year()
        const month = momentDate.month()
        const day = momentDate.day()
        console.log(year, month, day)
        return <> <p>{momentDate.format('DD-MM-YYYY')}</p>
            {  
                <ul>    
                    {
                        booking.turnsRequested.map((turn, i)=> 
                        <li key={i}>
                            {printTurn(turns[turn])}
                        </li>)
                    }
                </ul>
            }
        </>
        
    }

    return (
        <>
            <div>{bookings.length ? <ul>
                {bookings.map((booking, i)=>{
                    return <li key={i}>
                        {printReadable(booking)}
                    </li>
                })}
            </ul> : <></>}</div>
        </>
    );
};
export default ListBookings;
