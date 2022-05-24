export interface IBooking{
    from: number,
    to: number,
    bandId: number,
    roomId: number,
    support: string[],
    validatedBy?: number,
    validated: boolean,

}
export interface ITurn{
    start: string,
    end: string,
    available: boolean,
    turnId: number
}
export interface IBookingList{

}