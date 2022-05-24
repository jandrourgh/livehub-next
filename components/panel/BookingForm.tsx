import { IRoom } from "interfaces/Room"
import moment from "moment"
import { useEffect, useState } from "react"
import { Form, Field } from "react-final-form"
import { json } from "stream/consumers"
import SelectTurn from "./SelectTurn"

const BookingForm = ({token}: {token: string}) => {
    const onSubmit = (values:any) => {
        console.log(values)
    }
    const [rooms, setRooms] = useState<IRoom[]>([])
    const [room, setRoom] = useState<number>(-1)
    const [turnsRequested, setTurnsRequested] = useState<number[]>([])
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    useEffect(()=>{
        async function fetchRooms(){
            const roomsResponse = await fetch('http://localhost:3000/api/rooms', {
                headers: {"Authorization": `Bearer ${token}`}
            })
            const data = await roomsResponse.json()
            console.log(data)
            return data as {rooms: IRoom[]}
        }
        fetchRooms().then(data=>{
            if(data.rooms.length){
                setRoom(data.rooms[0].id)
            }
            setRooms(data.rooms)
        })
    },[token])
    const requestTurn = (turnId: number, addRemove: boolean) => {
        console.log(turnId, addRemove)
    }
    
    return(
        <form>
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
                <SelectTurn date={date} room={room} requestTurn={(turnId, addRemove) => requestTurn(turnId, addRemove)}></SelectTurn>
            </div>
        </form>
        
    )
}
export default BookingForm