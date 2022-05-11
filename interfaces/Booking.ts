export interface IBooking{
    from: number,
    to: number,
    bandId: number,
    roomId: number,
    support: string[],
    validatedBy?: number,
    validated: boolean,

}