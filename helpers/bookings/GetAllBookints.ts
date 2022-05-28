export const getAllBookings = async ( ) => {

    const allBookingsResponse = await fetch(
        "http://localhost:3001/bookings"
    );
    const allBookings = await allBookingsResponse.json();

    return allBookings
}