import { IPanelData } from 'interfaces/Panel'
import { IRoom } from 'interfaces/Room'
import { DateTime } from 'luxon'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import {Form, Field, FormSpy} from 'react-final-form'
import React from "react"
import { IUserProfile } from 'interfaces/User'

interface IEditRoomInfoFormProps {
    token: string
    data: IRoom
    userData: IUserProfile
}
const EditRoomInfoForm = ({ token, data, userData }: IEditRoomInfoFormProps) => {


    // useEffect(()=>{
    //     const fetchUserData = async()=>{
    //         const userResponse = await fetch(`http://localhost:3000/api/users/{${data.id}}`, {
    //             headers: {"Authorization": `Bearer ${token}`}
    //         })
    //         const user = await userResponse.json()
    //         return user
    //     } 
    //     fetchUserData().then(data=>// console.log(data))
    //     // console.log(data.id)
    // }, [data])

    const handleSubmit = (values: {until: string, equipment:string, address:string}) => {
        const sendData = {
            until: values.until,
            equipment: values.equipment.split('\n'),
            address: values.address
        }
        // console.log(sendData)
        const updateRoomResponse = fetch('http://localhost:3000/api/rooms/update', {
            headers: {"Authorization": `Bearer ${token}`},
            method: 'POST',
            body: JSON.stringify(sendData)
        })

    }
    return (
        <>
            <Form onSubmit={handleSubmit} render={({handleSubmit, values, })=> (
                <form onSubmit={handleSubmit} className="col-12 p-3">
                    <h3>Edit Room {data.id} info</h3>
                    <div>
                        <p>Hello, {userData.firstName} {userData.lastName} with ID {userData.id}</p>
                    </div>
                    <div className="my-3">
                        <label className='form-label' htmlFor="equipment">Equipment</label>
                        <Field className="form-control" name="equipment" id="equipment" initialValue={data.equipment.join("\n")} component="textarea" >
                            
                        </Field>
                    </div>
                    <div className="my-3">
                        <label className='form-label' htmlFor="address">Address</label>
                        <Field className="form-control"  name="address" id="address" initialValue={data.address} component="input" type="text">

                        </Field>
                    </div>
                    <button className='btn btn-dark' type="submit">Save settings</button>
                </form>
            )}>
            </Form>
        </>
    )
}
export default EditRoomInfoForm