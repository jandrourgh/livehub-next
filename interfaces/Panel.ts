import { IBand } from "./Band";
import { IRoom } from "./Room";
import { IUserProfile } from "./User";

export interface IPanelData {
    userData: IUserProfile,
    bands: IBand[]
    //bookings: IBooking[]
    role: string,
    roomData: IRoom
}