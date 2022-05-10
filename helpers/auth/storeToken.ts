import { IUserAuthResponse } from "interfaces/User"

export const storeToken = (data: IUserAuthResponse) =>{
    localStorage.setItem("user", JSON.stringify(data))
}