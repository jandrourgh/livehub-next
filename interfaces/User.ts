export interface IUser {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userName: string,
    role: string
}
export interface IUserLogin {
    email?: string,
    userName?: string,
    password: string
}
export interface IUserAuthResponse {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    token: string,
}