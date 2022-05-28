export interface IBooking {
    turnsRequested: number[];
    date: string;
    room: number;
    uid: number;
    id: number;
}
export interface ITurn {
    start: string;
    end: string;
    available: boolean;
    turnId: number;
}
export interface IBookingList {}
