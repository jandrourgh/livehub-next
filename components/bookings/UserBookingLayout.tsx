import { IBooking } from "interfaces/Booking"
import React, {useEffect, useState} from "react"
import QRCode from "react-qr-code"
import TicketWindow from "./TicketWindow"


interface UserBookingLayoutProps {
    booking: IBooking,
    token: string
}

const UserBookingLayout = ({booking, token}: UserBookingLayoutProps) => {
    const [url, setUrl] = useState(window.location.href)

    return (<>
        <div className="container">
            <div className="row text-center">
                <h2>Welcome to liveHUB</h2>
                <h2>Go Live!</h2>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-6 m-4">
                    <QRCode value={url}></QRCode>
                </div>
            </div>
            <div>
                <TicketWindow token={token} booking={booking}></TicketWindow>
            </div>
        </div>
    </>)
}
export default UserBookingLayout