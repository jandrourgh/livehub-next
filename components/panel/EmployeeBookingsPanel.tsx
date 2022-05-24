import { IRoom } from "interfaces/Room"
import EditRoomInfoForm from "./EditRoomInfoForm"

interface EmployeeBookingsPanelProps {
    token: string
    roomInfo: IRoom
}

const EmployeeBookingsPanel = ({token, roomInfo}: EmployeeBookingsPanelProps) => {

    return(
        <>
            <h2>Bookings</h2>
            <EditRoomInfoForm token={token} data={roomInfo}/>
        </>
    )
}
export default EmployeeBookingsPanel