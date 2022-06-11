import { IRoom } from "interfaces/Room"
import moment from "moment"
import { FormEvent, useEffect, useState } from "react"
import { Form, Field } from "react-final-form"
import { json } from "stream/consumers"
import SelectTurn from "./SelectTurn"
import React from "react"

const BookingForm = ({token, bookingSuccessful, closeModal}: {token: string, bookingSuccessful: ()=>void, closeModal: ()=>void}) => {
    const [rooms, setRooms] = useState<IRoom[]>([])
    const [room, setRoom] = useState<number>(-1)
    const [turnsRequested, setTurnsRequested] = useState<number[]>([])
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [fetchAgain, setFetchAgain] = useState(true)
    const [showError, setShowError] = useState(false)
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
            const turns = turnsRequested;
            turns.push(turnId)
            setTurnsRequested([...turns])
        } else {
            const turns = turnsRequested.filter((element)=>{
                return element != turnId
            })
            setTurnsRequested(turns)
        }
        //console.log(turnsRequested)
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
            //console.log("ha ido bien")
            bookingSuccessful()
            setFetchAgain(true)
            setTurnsRequested([])
            setShowError(false)
            closeModal()
        } else {
            //console.log("noppp")
            setShowError(true)
        }

    }
    const handleCloseForm = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault()
        closeModal()
    }
    
    return(
        <form onSubmit={(evt)=>handleSubmit(evt)} className="p-2">
            <div className="d-flex justify-content-between">
                <h3>Make Appointment</h3>
                <button className="btn btn-danger" onClick={(evt)=>handleCloseForm(evt)}>Close</button>
            </div>
            <div className="form-group">
                <label htmlFor="day" className="form-label">Select day</label>
                <input type="date" className="form-control" value={date} onChange={evt=>setDate(evt.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="room" className="form-label">Select room</label>
                <select 
                    className="form-control"
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
            <div className="p-1">
                {showError?<div className="alert alert-danger">Error: you have selected not available turns!</div> : ""}
                <SelectTurn showError={showError} values={turnsRequested} date={date} room={room} requestTurn={(turnId, addRemove) => requestTurn(turnId, addRemove)}></SelectTurn>
            </div>
            {
                turnsRequested.length?<button className="btn btn-dark" type="submit">Make {turnsRequested.length} appointment{turnsRequested.length>1?"s":""} for {date}</button>:<p>You must select at least 1 turn</p>
            }
            
        </form>
        
    )
}
export default BookingForm