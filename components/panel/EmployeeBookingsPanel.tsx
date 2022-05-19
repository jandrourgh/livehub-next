import GenerateBookingsForm from "./GenerateBookingsForm"

interface EmployeeBookingsPanelProps {
    token: string
}

const EmployeeBookingsPanel = ({token}: EmployeeBookingsPanelProps) => {

    return(
        <>
            <h2>Bookings</h2>
            <GenerateBookingsForm token={token}/>
        </>
    )
}
export default EmployeeBookingsPanel