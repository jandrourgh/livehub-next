import { IBookingList, ITurn } from "interfaces/Booking";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";

interface ISelectTurnProps {
    date: string;
    room: number;
    requestTurn: (turnId: number, addRemove: boolean) => void;
    values: number[];
}
const SelectTurn = ({ date, room, requestTurn, values }: ISelectTurnProps) => {
    const [turns, setTurns] = useState<ITurn[]>([]);
    const [bookable, setBookable] = useState<number[]>([])
    const printReadable = (start: string, end: string) => {
        const momentStart = moment(start);
        const momentEnd = moment(end);
        return `From ${momentStart.format("HH:mm")} to ${momentEnd.format(
            "HH:mm"
        )}`;
    };
    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        console.log("changed")
        requestTurn(parseInt(evt.target.value), evt.target.checked);
    };
    useEffect(() => {
        async function fetchBookings() {
            console.log(date, room);
            const response = await fetch(
                "http://localhost:3000/api/bookings/getByDayRoom",
                {
                    method: "POST",
                    body: JSON.stringify({ date: date, room: room }),
                }
            );
            const bookings = (await response.json()) as ITurn[];
            return bookings;
        }
        if (room >= 0) {
            fetchBookings().then((data) => setTurns(data));
        }
        console.log("bookable: ", bookable, values)
    }, [date, room, bookable, values]);
    return (
        <ul>
            {turns.map((turn, i) => (
                <li key={i}>
                    <label htmlFor={`turn_${i}`}>
                        {printReadable(turn.start, turn.end)}
                    </label>

                    <input
                        type="checkbox"
                        name="turn"
                        value={turn.turnId}
                        checked={values.includes(i)}
                        onChange={(evt) => handleChange(evt)}
                        //disabled={!turn.available}
                        id={`turn_${i}`}
                    />
                    {
                        !turn.available?
                        <label htmlFor={`turn_${i}`}>
                        Not available
                        </label> : <></>
                    }
                    
                </li>
            ))}
        </ul>
    );
};
export default SelectTurn;
