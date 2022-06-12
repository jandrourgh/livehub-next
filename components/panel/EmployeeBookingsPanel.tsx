import { IRoom } from "interfaces/Room"
import EditRoomInfoForm from "./EditRoomInfoForm"
import React, { useEffect, useState } from "react"
import ListBookings from "./ListBookings"
import { IBooking } from "interfaces/Booking"
import moment from "moment"

interface EmployeeBookingsPanelProps {
    token: string
    roomInfo: IRoom
}

const EmployeeBookingsPanel = ({token, roomInfo}: EmployeeBookingsPanelProps) => {

    const [bookings, setBookings] = useState<IBooking[]>([])
    const [filterMode, setFilterMode] = useState("all")
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [filteredBookings, setFilteredBookings] = useState<IBooking[]>([])

    useEffect(()=>{
        const fetchData = async () => {
            const getBookingsResponse = await fetch("http://localhost:3000/api/bookings/getEmployeeBookings", {
                headers: {"Authorization": `Bearer ${token}`}
            })
            const allBookings = getBookingsResponse.json()
            return allBookings
        }
        fetchData().then(data=>{
            setBookings(data)
        })
    }, [token])

    useEffect(()=>{
        if(filterMode==="all") {
            setFilteredBookings(bookings)
        } else if (filterMode==="specific"){
            setFilteredBookings(bookings.filter((booking)=>booking.date===date))
        }
    }, [filterMode, date,bookings])


    return(
        <>
            <h2>Bookings</h2>
            <div>
                <div>
                    <label htmlFor="all">See all bookings</label>
                    <input name="filter" value="all" checked={filterMode==="all"} onChange={(evt)=>setFilterMode(evt.target.value)} type="radio" id="all" />
                </div>
                <div>
                    <label htmlFor="specific">See specific day bookings</label>
                    <input name="filter" value="specific" checked={filterMode==="specific"} onChange={(evt)=>setFilterMode(evt.target.value)} type="radio" id="specific" />
                </div>
                {filterMode==="specific"?<div>
                    <label htmlFor="date">Choose a day</label>
                    <input type="date" value={date} onChange={(evt)=> {setDate(evt.target.value)}} name="date" id="date" />
                </div>:<></>}
            </div>
            <ListBookings bookings={filteredBookings} ></ListBookings>
            <EditRoomInfoForm token={token} data={roomInfo}/>
        </>
    )
}
export default EmployeeBookingsPanel