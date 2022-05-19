import {Form, Field} from "react-final-form"
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from '../../helpers/forms/CardUtils'

interface BuyHoursFormProps {
    token: string
}

const BuyHoursForm = ({ token }: BuyHoursFormProps) => {

    const onSubmit = async (values: any) => {
        console.log("submit credit card", values)
        const response = await fetch('api/bookings/buyHours', {
            headers: { "Authorization" : `Bearer ${token}`},
            method: "POST",
            body: JSON.stringify(values)
        })
        console.log(response)
    }
    const HOUR_PRICE = 9.95

    return (
        <>
            <h3>Buy hours</h3>
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
            <div>
                <Field name="hours"
                    component="input"
                    type="number"
                    defaultValue={1}
                >

                </Field>
            </div>

            <div>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                defaultValue={""}
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            <div>
                <p>Total: </p>
                <p>{values.hours * HOUR_PRICE} €</p>
            </div>
            <div className="buttons">
                
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
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