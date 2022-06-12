import { generateTurns } from "helpers/bookings/GenerateTurns";
import { IBooking, ITurn } from "interfaces/Booking";
import moment, { Moment } from "moment";
import Link from "next/link";
import React, { useEffect } from "react";

const ListBookings = ({ bookings }: { bookings: IBooking[]}) => {
    
    const turns = generateTurns(moment().format('YYYY-MM-DD'))
    // console.log(turns)

    const printTurn = (turn: ITurn) => {
        const startTime = moment(turn.start).format('HH:mm')
        const endTime = moment(turn.end).format('HH:mm')
        return `From ${startTime} to ${endTime}`
    }

    const printReadable = (booking: IBooking) => {
        // console.log(booking)
        const momentDate = moment(booking.date)
        const year = momentDate.year()
        const month = momentDate.month()
        const day = momentDate.day()
        // console.log(year, month, day)
        return <div className="card">
            <div className="card-header">
            <h4>{momentDate.format('DD-MM-YYYY')}</h4>
            <h5>ID: {booking.id}</h5>
                </div> 
            {  
            <>
                <div className="card-body">
                    <ul className="list-group list-group-flush">    
                        {
                            booking.turnsRequested.sort().map((turn, i)=> 
                            <li key={i} className="list-group-item">
                                {printTurn(turns[turn])}
                            </li>)
                        }
                    </ul>
                    </div>
                    <div className="card-footer">
                        <button className="btn">
                            <Link href={`bookings/${booking.id}`}>Go to booking</Link>
                        </button>

                    </div>
            </>
            }
        </div>
        
    }

    return (
        <>
            <div>{bookings.length ? <div className="row">
                {bookings.sort((b1,b2)=>b1.date>b2.date?-1:1).map((booking, i)=>{
                    return <div className="col-6 p-2" key={i}>
                        {printReadable(booking)}
                    </div>
                })}
            </div> : <></>}</div>
        </>
    );
};
export default ListBookings;
