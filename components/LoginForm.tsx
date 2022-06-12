import { storeToken } from "helpers/auth/storeToken";
import { IUserAuthResponse, IUserLogin, IUserRegister } from "interfaces/User";
import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { FORM_ERROR } from "final-form";

const Condition = ({
	when,
	is,
	children,
}: {
	when: string;
	is: string;
	children: React.ReactNode;
}) => (
	<Field className="form-control" name={when} subscription={{ value: true }}>
		{({ input: { value } }) => (value === is ? children : null)}
	</Field>
);

interface ILoginFormProps {
	loginCallback: (data: IUserAuthResponse) => void;
}

const LoginForm = ({ loginCallback }: ILoginFormProps) => {
	const composeValidators =
		(...validators: any[]) =>
		(value: any) =>
			validators.reduce(
				(error, validator) => error || validator(value),
				undefined
			);

	const required = (value: string | undefined) =>
		value ? undefined : "is-invalid";

	const passwordMatch =
		(password: string | undefined) => (value: string | undefined) =>
			value !== password ? "is-invalid" : "";

	const handleSubmit = async (formData: any) => {
		// console.log(formData)
		/* eslint-disable */
		switch (formData.login) {
			case "login":
				const loginResponse = await fetch("api/users/login", {
					method: "POST",
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
					}),
				});
				switch (loginResponse.status) {
					case 200:
						const data: IUserAuthResponse =
							await loginResponse.json();
						storeToken(data);
						loginCallback(data);
						break;
					case 401:
						return { [FORM_ERROR]: 'Wrong credentials'}
				}
				break;
			case "register":
				const newUser: IUserRegister = {
					email: formData.email,
					firstName: formData["first-name"],
					lastName: formData["last-name"],
					password: formData.password,
					userName: formData.username,
				};
				const registerResponse = await fetch("api/users/register", {
					method: "POST",
					body: JSON.stringify(newUser),
					headers: {
						"Content-Type": "application/json",
					},
				});
				// console.log(registerResponse)
				switch (registerResponse.status) {
					case 200:
						const data: IUserAuthResponse =
							await registerResponse.json();
						storeToken(data);
						loginCallback(data);
						break;
					case 401:
                        return { [FORM_ERROR]: 'e-mail already taken!'}
					default:
						break;
				}

				break;
			default:
			// console.log("queeee")
		}
	};

	const validate = (values: Record<string, any>) => {
		const errors = {};
		console.log(values);
	};

	return (
		<Form
			initialValues={{ login: "login" }}
			onSubmit={handleSubmit}
			validate={() => validate}
			debug={(state, fieldState) => console.log(state, fieldState)}
			render={({ handleSubmit, errors, hasValidationErrors, submitError }) => (
				<form
					onSubmit={handleSubmit}
					className="bg-dark text-light p-4"
				>
                    
                        {submitError?<div className="alert alert-danger">{submitError}</div>:"" }
                    
					<div className="form-check">
						<label className="form-check-label" htmlFor="login">
							Login
						</label>
						<Field
							name="login"
							component="input"
							type="radio"
							value="login"
							className="form-check-input"
							id="login"
						></Field>
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="register">
							Register
						</label>
						<Field
							name="login"
							component="input"
							type="radio"
							value="register"
							className="form-check-input"
							id="register"
						></Field>
					</div>
					<div>
						<label className="form-label">e-mail</label>
						<Field
							className={`form-control ${errors&&errors["email"]}`}
							name="email"
							validate={required}
							formatOnBlur
							component="input"
							type="email"
						></Field>
						<div className="invalid-feedback">You must specify an e-mail</div>
					</div>
					<Condition when="login" is="register">
						<div>
							<label className="form-label">Username</label>
							<Field
								className={`form-control ${errors&&errors["username"]}`}
								name="username"
								validate={required}
								formatOnBlur
								component="input"
								type="text"
							></Field>
                            <div className="invalid-feedback">You must specify a Username</div>

						</div>
						<div>
							<label className="form-label">First Name</label>
							<Field
								className={`form-control ${errors&&errors["first-name"]}`}
								name="first-name"
								validate={required}
								formatOnBlur
								component="input"
								type="text"
							></Field>
                            <div className="invalid-feedback">You must specify your First Name</div>
						</div>
						<div>
							<label className="form-label">Last Name</label>
							<Field
								className={`form-control ${errors&&errors["last-name"]}`}
								name="last-name"
								validate={required}
								formatOnBlur
								component="input"
								type="text"
							></Field>
                            <div className="invalid-feedback">You must specify your last name</div>
						</div>
					</Condition>
					<div>
						<label className="form-label">Password</label>
						<Field
							className={`form-control ${errors&&errors["password"]}`}
							name="password"
							validate={required}
							formatOnBlur
							component={"input"}
							type={"password"}
						></Field>
                        <div className="invalid-feedback">You must set a password</div>
					</div>
					<Condition when="login" is="register">
						<FormSpy>
							{(props) => (
								<>
									<div>
										<label className="form-label">
											Repeat password
										</label>
										<Field
											className={`form-control ${errors&&errors["repassword"]}`}
											name="repassword"
											validate={passwordMatch(
												props.values.password
											)}
											formatOnBlur
											component={"input"}
											type={"password"}
										></Field>
                                        <div className="invalid-feedback">Seems like passwords doesn't match</div>
										{}
									</div>
								</>
							)}
						</FormSpy>
					</Condition>
					<div className="d-flex justify-content-center">
						<button
							type="submit"
							className="btn btn-light mt-4"
							disabled={hasValidationErrors ? true : false}
						>
							Submit
						</button>
					</div>
				</form>
			)}
		></Form>
	);
};
export default LoginForm;
/* eslint-enable */
