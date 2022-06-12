import { IBooking, ITicket } from "interfaces/Booking"
import React, {useEffect, useRef, useState} from "react"
interface TokenWindowProps {
    booking: IBooking,
    token: string
}

const TicketWindow = ({booking, token}: TokenWindowProps) => {

    const [messages, setMessages] = useState<ITicket[]>([])
    const [message, setMessage] = useState("")

    const fetchMessages = async (booking:IBooking, token: string) => {
        console.log(booking, token)
        const getBookingResponse = await fetch(`http://localhost:3000/api/bookings/${booking.id}`, {
            headers: {"Authorization": `Bearer ${token}`}
        })
        const response = await getBookingResponse.json()
        console.log(response)
        //console.log(response.booking.tickets)
        const tickets = []
        console.log(response)
        if(response.booking){
            return response.booking.tickets as ITicket[]
        } else if (response.fullBooking){
            return response.fullBooking.tickets as ITicket[]
        }
        //return response.booking.tickets as ITicket[]

    }
    
    const sendMessage = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const sendMessageResponse = await fetch(`http://localhost:3000/api/tickets/${booking.id}`, {
            headers: {"Authorization": `Bearer ${token}`},
            method: "POST",
            body: message
        })
        if(sendMessageResponse.ok){
            setMessage("")
        }
    }

    const bottomRef = useRef<null | HTMLDivElement>(null)


    useEffect(()=>{
        const interval = setInterval(() => {
            fetchMessages(booking, token).then((data)=>{
                if(data && data.length !== messages.length){
                    setMessages(data)
                    if(bottomRef.current){
                        bottomRef.current.scrollIntoView({behavior: 'smooth'})

                    }
                }
            })
          }, 2000);
          return () => clearInterval(interval);
    }, [booking, token])

    return (
        <div className="container">
            <h4>For anything you have to say, use the chat below</h4>

            <div className="card">
                {messages.length?<ul style={{height:"200px"}} className=" card-body overflow-scroll m-0">{messages.map((message, i)=> (
                    <li key={i} className={`row d-flex ${message.sender=="admin"? 'justify-content-start' : 'justify-content-end'}`}>
                        <div className={`col-8 m-1 rounded-pill ${message.sender=="admin"? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            <p className={`m-0 p-1 ${message.sender=="admin"? 'text-start' : 'text-end'}`}>
                                {message.body}
                            </p>
                        </div>
                    </li>
                    
                ))}<div ref={bottomRef}></div> </ul>:""}
                <div className="card-footer">
                    <form action="" onSubmit={(evt)=>sendMessage(evt)}>
                        <div className="input-group">
                            <input type="text" className="form-control" value={message} onChange={evt=>setMessage(evt.currentTarget.value)} />
                            <button className="input-group-text btn-dark">Send</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default TicketWindow