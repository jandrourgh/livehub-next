export interface IBooking {
    turnsRequested: number[];
    date: string;
    room: number;
    uid: number;
    id: number;
    tickets?: ITicket[]
}
export interface ITurn {
    start: string;
    end: string;
    available: boolean;
    turnId: number;
}
export interface IBookingList {}

export interface ITicket {
    sender: "user"|"admin",
    body: "string"
}

export interface IFullBookingInfo extends IBooking {
    messages?: string[],
}