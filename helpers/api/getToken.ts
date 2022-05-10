import { IUser } from 'interfaces/User'
import {sign} from 'jsonwebtoken'

export const getToken = (data: IUser): string=>{
    return(sign({ sub: data.id }, "AAAAEEEEIIIIOOOOUUUU", { expiresIn: '7d' }))
}