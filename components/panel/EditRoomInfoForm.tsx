import { IPanelData } from 'interfaces/Panel'
import { IRoom } from 'interfaces/Room'
import { DateTime } from 'luxon'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import {Form, Field, FormSpy} from 'react-final-form'
import React from "react"

interface IEditRoomInfoFormProps {
    token: string
    data: IRoom
}
const EditRoomInfoForm = ({ token, data }: IEditRoomInfoFormProps) => {


    useEffect(()=>{
        const date = new Date()
        console.log(date.getFullYear())
        console.log(data)
    })

    const handleSubmit = (values: {until: string, equipment:string, address:string}) => {
        const sendData = {
            until: values.until,
            equipment: values.equipment.split('\n'),
            address: values.address
        }
        console.log(sendData)
        const updateRoomResponse = fetch('http://localhost:3000/api/rooms/update', {
            headers: {"Authorization": `Bearer ${token}`},
            method: 'POST',
            body: JSON.stringify(sendData)
        })

    }
    return (
        <>
            <Form onSubmit={handleSubmit} render={({handleSubmit, values, })=> (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="equipment">Equipment</label>
                        <Field name="equipment" id="equipment" component="textarea" >
                            
                        </Field>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <Field  name="address" id="address" component="input" type="text">

                        </Field>
                    </div>
                    <button type="submit">Save settings</button>
                </form>
            )}>
            </Form>
        </>
    )
}
export default EditRoomInfoForm