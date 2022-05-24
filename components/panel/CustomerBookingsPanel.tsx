import BookingForm from "./BookingForm"
import BuyHoursForm from "./BuyHoursForm"

interface BookingsPanelProps {
    token: string
}

const CustomerBookingsPanel = ({token}: BookingsPanelProps) => {
    return (
        <>
            <h2>My Bookings</h2>
            <section>
                <p>Hours remaining: </p>
                <BuyHoursForm token={token}></BuyHoursForm>
                <BookingForm token={token}></BookingForm>
            </section>
        </>
    )
}

export default CustomerBookingsPanel