import { IRoom } from "interfaces/Room"
import moment from "moment"
import { FormEvent, useEffect, useState } from "react"
import { Form, Field } from "react-final-form"
import { json } from "stream/consumers"
import SelectTurn from "./SelectTurn"

const BookingForm = ({token, bookingSuccessful}: {token: string, bookingSuccessful: ()=>void}) => {
    const [rooms, setRooms] = useState<IRoom[]>([])
    const [room, setRoom] = useState<number>(-1)
    const [turnsRequested, setTurnsRequested] = useState<number[]>([])
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [fetchAgain, setFetchAgain] = useState(true)
    useEffect(()=>{
        async function fetchRooms(){
            const roomsResponse = await fetch('http://localhost:3000/api/rooms', {
                headers: {"Authorization": `Bearer ${token}`}
            })
            const data = await roomsResponse.json()
            console.log(data)
            return data as {rooms: IRoom[]}
        }
        if(fetchAgain){
            console.log("fetchinggg")
            fetchRooms().then(data=>{
                if(data.rooms.length){
                    setRoom(data.rooms[0].id)
                }
                setRooms(data.rooms)
                setFetchAgain(false)
            })
        }
    },[token, fetchAgain])
    const requestTurn = (turnId: number, addRemove: boolean) => {
        console.log(turnId, addRemove )
        if(addRemove){
            let turns = turnsRequested;
            turns.push(turnId)
            setTurnsRequested([...turns])
        } else {
            let turns = turnsRequested.filter((element)=>{
                return element != turnId
            })
            setTurnsRequested(turns)
        }
        console.log(turnsRequested)
    }
    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        console.log("SUBMIT", turnsRequested, date, room)
        console.log()
        const makeBookingRequest = await fetch('http://localhost:3000/api/bookings/makeBooking', {
            headers: {"Authorization": `Bearer ${token}`},
            method: "POST",
            body: JSON.stringify({turnsRequested: turnsRequested, date: date, room:room})
        })
        if(makeBookingRequest.ok){
            console.log("ha ido bien")
            bookingSuccessful()
            setFetchAgain(true)
            setTurnsRequested([])
        } else {
            console.log("noppp")
        }

    }
    
    return(
        <form onSubmit={(evt)=>handleSubmit(evt)}>
            <div>
                <label htmlFor="day">Select day</label>
                <input type="date" value={date} onChange={evt=>setDate(evt.target.value)}/>
            </div>
            <div>
                <label htmlFor="room">Select room</label>
                <select 
                    value={room}
                    onChange={
                        evt=>setRoom(parseInt(evt.target.value))
                    }
                    >

                    {rooms.map((room, i)=>{
                        return <option value={room.id} key={i}>{room.address}</option>
                    })}
                </select>
            </div>
            <div>
                <SelectTurn values={turnsRequested} date={date} room={room} requestTurn={(turnId, addRemove) => requestTurn(turnId, addRemove)}></SelectTurn>
            </div>
            <button type="submit">Submit</button>
        </form>
        
    )
}
export default BookingForm