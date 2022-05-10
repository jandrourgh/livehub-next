import React from "react";
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

    const handleSubmit = async (formData: any) => {
        console.log(formData)
        switch (formData.login) {
            case "login":        
                const response = await fetch("api/users/login", {
                    method:"POST",
                    body: JSON.stringify({email: formData.email, password: formData.password})
                })
                console.log(response)
                switch(response.status){
                    case 200:
                        const data = await response.json()
                        console.log(data)
                        localStorage.setItem("user", JSON.stringify(data))
                        break;
                    case 401:
                        console.log("unauthorized")
                        break
                }
            case "register":
                fetch("api/users/register", {
                    method: "POST",
                    body: JSON.stringify({
                        formData
                    })
                })
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
                    <div >
                        <label className="form-check-label" htmlFor="login">Login</label>
                        <Field
                            name="login"
                            component="input"
                            type="radio"
                            value="login"
                            className="form-check-input"
                            id="login">
                        </Field>
                    </div>
                    <div >
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
                    <div>
                        <label>e-mail</label>
                        <Field name="email"
                            validate={required}
                            formatOnBlur
                            component="input"
                            type="email"
                            >

                        </Field>
                    </div>
                    <Condition when="login" is="register">
                        <div>
                            <label>Username</label>
                            <Field name="username" 
                                validate={required}
                                formatOnBlur
                                component="input"
                                type="text">
                            </Field>
                        </div>
                        <div>
                            <label>First Name</label>
                            <Field 
                                name="first-name" 
                                validate={required} 
                                formatOnBlur 
                                component="input" 
                                type="text">
                            </Field>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <Field 
                                name="last-name" 
                                validate={required} 
                                formatOnBlur 
                                component="input" 
                                type="text">
                            </Field>
                        </div>
                    </Condition>
                    <div>
                        <label>Password</label>
                        <Field name="password"
                            validate={required}
                            formatOnBlur
                            component={"input"} 
                            type={"password"}>
                        </Field>
                    </div>
                    <Condition when="login" is="register">
                        <FormSpy>
                            {props=>
                            <>
                                <div>
                                    <label>Repeat password</label>
                                    <Field name="repassword"
                                        validate={passwordMatch(props.values.password)}
                                        formatOnBlur
                                        component={"input"}
                                        type={"password"}>
                                    </Field>
                                </div>
                            </>
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