import {Form, Field} from "react-final-form"
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from '../../helpers/forms/CardUtils'
  import React from "react"

interface BuyHoursFormProps {
    token: string,
    closeForm: ()=>void
}

const BuyHoursForm = ({ token, closeForm }: BuyHoursFormProps) => {

    const handleCloseFormClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault()
      closeForm()
    }

    const onSubmit = async (values: any) => {
        // console.log("submit credit card", values)
        const response = await fetch('api/bookings/buyHours', {
            headers: { "Authorization" : `Bearer ${token}`},
            method: "POST",
            body: JSON.stringify(values)
        })
        // console.log(response)
    }
    const HOUR_PRICE = 9.95

    return (
        <>
            <div className="d-flex justify-content-between">
              <h3>Buy hours</h3>
              <button className=" btn btn-danger" onClick={(evt)=>handleCloseFormClick(evt)}> Close </button>

            </div>
            <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values

      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="input-group m-2 ">
                <label htmlFor="" className="input-group-text">Hours</label>
                <Field name="hours"
                    component="input"
                    type="number"
                    defaultValue={1}
                    className="form-control"
                >

                </Field>
            </div>

            <div className="input-group m-2">
            <label htmlFor="" className="input-group-text">Card Number</label>

              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                defaultValue={""}
                className="form-control"
                format={formatCreditCardNumber}
              />
            </div>
            <div className="input-group m-2">
            <label htmlFor="" className="input-group-text">Name</label>

              <Field
                name="name"
                component="input"
                type="text"
                className="form-control"
              />
            </div>
            
            <div className="input-group m-2">
              <label htmlFor="" className="input-group-text">Valid thru</label>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                className="form-control"
                format={formatExpirationDate}
              />
            </div>
            <div className="input-group m-2">
              <label htmlFor="" className="input-group-text">CVC</label>
              <Field
                className="form-control"
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />

            </div>
            <div>
                <h4>Total: {values.hours * HOUR_PRICE} €</h4>
            </div>
            <div className="buttons">
                
              <button type="submit" disabled={submitting} className="btn btn-dark">
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
                className="btn btn-clear m-2"
              >
                Reset
              </button>
            </div>
          </form>
        )
      }}
    />
        </>
    )
}

export default BuyHoursForm