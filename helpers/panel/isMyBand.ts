import { IBand } from "interfaces/Band"
import { IToken } from "interfaces/Token"
import { IUser } from "interfaces/User"
import { verify } from "jsonwebtoken"

export const isMyBand = async (token: string, bandId: number) => {
    const verifiedToken = verify(token, "AAAAEEEEIIIIOOOOUUUU") as IToken
    const response = await fetch(`http://localhost:3001/users/${verifiedToken.uid}`)
    const userData: IUser = await response.json()
    if(userData.role=="user"){
        const bandsResponse = await fetch(`http://localhost:3001/bands/${bandId}`)
        const band: IBand = await bandsResponse.json()
        if(band.userId == userData.id){
            return true
        } else {
            return false
        }
        
    } else if(userData.role=="admin" || userData.role=="employee") {
        return true
    }
}