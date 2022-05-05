import { FormApi, } from "final-form";
import React, { ComponentElement, useState } from "react";
import { Form, Field, FormSpy } from 'react-final-form'

const Condition = ({ when, is, children }: { when: string, is: string, children: React.ReactNode }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>
)

const LoginForm = () => {

    const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

    const required = (value: string|undefined )=>(value?undefined: 'is-invalid')

    const usernameAvailable = (value: string) => {
        console.log("username available")
    }

    const passwordMatch = (password:string|undefined) => 
        (value: string|undefined )=> 
        value!==password?'is-invalid':""

    const handleSubmit = (data: any) => {
        console.log(data)
        switch (data.login) {
            case "login":
                break;
            case "register":
                break;
        }
    }

    const validate = (values: Record<string, any>) => {
        const errors = {}
        console.log(values)
    }

    return (
        <Form
            initialValues={{login: "login"}}
            onSubmit={handleSubmit}
            validate={()=>validate}
            //debug={(state, fieldState) => console.log(state, fieldState)}
            render={({ handleSubmit, values  }) => (
                <form onSubmit={handleSubmit}>
                <pre>
                    {JSON.stringify(values)}
                </pre>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="login">Login</label>
                        <Field
                            name="login"
                            component="input"
                            type="radio"
                            value="login"
                            className="form-check-input"
                            id="login"
                            >
                        </Field>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="register">Register</label>
                        <Field
                            name="login"
                            component="input"
                            type="radio"
                            value="register"
                            className="form-check-input"
                            id="register">

                        </Field>
                    </div>
                    <Field 
                        name="username" 
                        //validate={composeValidators(required, usernameAvailable)}
                        validate={required}
                        formatOnBlur
                        >
                        {({ input, meta }) => (
                            <div className="form-group">
                                <label htmlFor="user">User</label>
                                <input {...input} className={`form-control ${meta.error?meta.error:""}`} name="user" type="text"  />
                                <div className={`invalid-feedback `}>
                                    Error
                                </div>
                                <div className="valid-feedback">
                                    Username available
                                </div>
                            </div>
                        )}

                    </Field>
                    <Condition when="login" is="register">
                        <Field name="firstname" validate={required}>
                            {({ input, meta }) => (
                                <div className="form-group">
                                    <label htmlFor="firstname">First Name</label>
                                    <input {...input} className={`form-control  ${meta.error!=undefined?meta.error:""}`} name="user" type="text" />
                                    <div className={`invalid-feedback`}>
                                        You must provide a name
                                    </div>
                                    <div className={`valid-feedback `}>
                                        Username available
                                    </div>
                                </div>
                            )}

                        </Field>
                        <Field name="lastname">
                            {({ input, meta }) => (
                                <div className="form-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input {...input} className={`form-control `} name="user" type="text" />
                                    <div className="invalid-feedback">
                                        {meta.error}
                                    </div>
                                </div>
                            )}

                        </Field>
                    </Condition>
                    <label htmlFor="password">Password</label>
                    <Field name="password">
                        {({ input, meta }) => (
                            <div className="form-group mt-2">
                                <input type="password" {...input} className={`form-control`} />

                                <div className="invalid-feedback">
                                    Please provide a password
                                </div>
                            </div>
                        )}

                    </Field>

                    <Condition when="login" is="register">
                        <label htmlFor="repassword">Repeat password</label>
                        <FormSpy >
                            {
                                props=>(
                                    <Field name="repassword" validate={passwordMatch(props.values.password)}>
                                        {({ input, meta }) => (
                                            <div className="form-group mt-2">
                                                <input type="password" {...input} className={`form-control ${meta.error!==undefined?meta.error:""}`} />

                                                <div className="invalid-feedback">
                                                    Password doesnt match!
                                                </div>
                                            </div>
                                        )}

                                    </Field>
                                )
                            }
                        </FormSpy>
                    </Condition>

                    <button type="submit" className="btn btn-dark mt-4">Submit</button>
                </form>
            )}>

        </Form>
    )
}
export default LoginForm