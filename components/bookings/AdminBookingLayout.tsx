import { IBooking, IFullBookingInfo } from "interfaces/Booking"
import React, { useEffect, useState } from "react"
import TicketWindow from "./TicketWindow"

interface AdminBookingLayoutProps {
    booking: IBooking,
    token: string
}

const AdminBookingLayout = ({booking, token}: AdminBookingLayoutProps) => {

    const [fullBooking, setFullBooking] = useState<undefined|IFullBookingInfo>(undefined)

    useEffect(()=>{
        const fetchData = async () =>{
            const getBookingResponse = await fetch(`http://localhost:3000/api/bookings/${booking.id}`, {
                headers:{"Authorization": `Bearer ${token}`}
            })
            if(getBookingResponse.ok){
                const data = await getBookingResponse.json()
                return data
            } else {
                return "Error"
            }
        }
        fetchData().then(data=>setFullBooking(data.fullBooking))
    }, [])
    useEffect(()=>{
        if(fullBooking){
            console.log(fullBooking)
        }
    }, [fullBooking])
    return (<div className="container">
        <h2>Booking info: </h2>
        <div className="bg-dark text-light p-4">
            {
            fullBooking?.messages?.map((message, i)=><p key={i}>{message}</p>)
            }

        </div>
        <div>
            <TicketWindow token={token} booking={booking}></TicketWindow>
        </div>
    </div>)
}
export default AdminBookingLayout