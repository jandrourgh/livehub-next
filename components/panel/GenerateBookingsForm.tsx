import { DateTime } from 'luxon'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import {Form, Field, FormSpy} from 'react-final-form'
interface GenerateBookingsFormProps {
    token: string
}
const GenerateBookingsForm = ({ token }: GenerateBookingsFormProps) => {


    useEffect(()=>{
        const date = new Date()
        console.log(date.getFullYear())
    })
    const months = useMemo(()=>moment.months(), []) 
    const date = useMemo(()=>new Date(), [])

    const handleSubmit = (values: any) => {
        console.log(values)
    }
    return (
        <>
            <Form onSubmit={handleSubmit} render={({handleSubmit, values, })=> (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="until">Accept bookings until: </label>
                        <Field name="until" component="input" type='date'>

                        </Field>
                    </div>
                    <button type="submit">Save settings</button>
                </form>
            )}>
            </Form>
        </>
    )
}
export default GenerateBookingsForm