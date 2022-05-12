import { IBand } from "./Band";
import { IUserProfile } from "./User";

export interface IPanelData {
    userData: IUserProfile,
    bands: IBand[]
    //bookings: IBooking[]
}