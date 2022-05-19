export interface IUser {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userName: string,
    role: "user" | "employee" | "admin",
    hours?: number
}
export interface IUserLogin {
    email?: string,
    userName?: string,
    password: string
}
export interface IUserRegister {
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    password: string
}
export interface IUserAuthResponse {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    token: string,
}
export interface IUserSave {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password:string,
    role: "user"
}
export interface IUserProfile{
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
}