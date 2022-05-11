import { IBand } from "./Band";
import { IUserProfile } from "./User";

export interface PanelData {
    userData: IUserProfile,
    bands: IBand[]
    //bookings: IBooking[]
}