import { IBooking } from "interfaces/Booking"
import { useEffect, useState } from "react"
import BookingForm from "./BookingForm"
import BuyHoursForm from "./BuyHoursForm"
import ListBookings from "./ListBookings"

interface BookingsPanelProps {
    token: string
}

const CustomerBookingsPanel = ({token}: BookingsPanelProps) => {

    const [bookings, setBookings] = useState<IBooking[]>([])
    const [loading, setLoading] = useState(true)
    // useEffect(()=>{
    //     refreshBookings()
    // },[refreshBookings])
    useEffect(()=>{
        if(loading){
            const fetchBookings = async () => {
                console.log("refresh bookings")
                const bookingsResponse = await fetch('http://localhost:3000/api/bookings/getUserBookings', {
                    headers:{"Authorization": `Bearer ${token}`}
                })
                const data: IBooking[] = await bookingsResponse.json()
                console.log(data)
                return data
            }
            fetchBookings().then(data=>setBookings(data))
            setLoading(false)
        }
    }, [token, loading])

    const refreshBookings = async () => {
        setLoading(true)
    }

    return (
        <>
            <h2>My Bookings</h2>
            <section>
                <p>Hours remaining: </p>
                <BuyHoursForm token={token}></BuyHoursForm>
                <BookingForm token={token} bookingSuccessful={refreshBookings}></BookingForm>
                <ListBookings bookings={bookings} ></ListBookings>
            </section>
        </>
    )
}

export default CustomerBookingsPanel