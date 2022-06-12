import { IBooking } from "interfaces/Booking"
import React from "react"

interface AdminBookingLayoutProps {
    booking: IBooking,
    token: string
}

const AdminBookingLayout = ({booking, token}: AdminBookingLayoutProps) => {
    return (<>adminbookingLayout</>)
}
export default AdminBookingLayout