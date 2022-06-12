import { IBooking } from "interfaces/Booking"
import { useEffect, useState } from "react"
import BookingForm from "./BookingForm"
import BuyHoursForm from "./BuyHoursForm"
import ListBookings from "./ListBookings"
import React from "react"
import { IUserProfile } from "interfaces/User"
import { Modal } from "react-bootstrap"

interface BookingsPanelProps {
    token: string,
    userData: IUserProfile
}

const CustomerBookingsPanel = ({token, userData}: BookingsPanelProps) => {

    const [bookings, setBookings] = useState<IBooking[]>([])
    const [loading, setLoading] = useState(true)
    const [buyHoursModalOpen, setBuyHoursModalOpen] = useState(false)
    const [makeAppointmentModalOpen, setMakeAppointmentModalOpen] = useState(false)
    // useEffect(()=>{
    //     refreshBookings()
    // },[refreshBookings])
    useEffect(()=>{
        if(loading){
            const fetchBookings = async () => {
                // console.log("refresh bookings")
                const bookingsResponse = await fetch('http://localhost:3000/api/bookings/getUserBookings', {
                    headers:{"Authorization": `Bearer ${token}`}
                })
                const data: IBooking[] = await bookingsResponse.json()
                // console.log(data)
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
        <section className="col-8">
            <h2>My Bookings</h2>
            <section>
                <div className="d-flex">
                    <h4>Hours remaining: {userData.hours?userData.hours: "0"}</h4>
                    <button className="btn btn-clear border mx-4" onClick={()=>setBuyHoursModalOpen(true)}>Buy Hours</button>

                </div>
                <div className="d-flex my-3">
                    <button className="btn btn-dark" onClick={()=>setMakeAppointmentModalOpen(true)}>Make Appointment</button>
                </div>
                <Modal show={buyHoursModalOpen}>
                    <div className="container p-2">
                    <BuyHoursForm token={token} closeForm={()=>setBuyHoursModalOpen(false)}></BuyHoursForm>

                    </div>
                </Modal>
                <Modal show={makeAppointmentModalOpen}>
                    <BookingForm token={token} bookingSuccessful={refreshBookings} closeModal={()=>setMakeAppointmentModalOpen(false)}></BookingForm>

                </Modal>
                <ListBookings bookings={bookings} ></ListBookings>
            </section>
        </section >
    )
}

export default CustomerBookingsPanel