import { getToken } from 'helpers/api/getToken'
import { IUser, IUserAuthResponse, IUserRegister, IUserSave } from 'interfaces/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUidFromRequest } from 'helpers/auth/getUidFromRequest'
import { IBand, IBandUpload } from 'interfaces/Band'
import { ITheme } from 'interfaces/Theme'
import { userCanEditBand } from 'helpers/api/userCanEditBand'

interface ISaveFormResponse{
    message?: string
    band?: IBand
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISaveFormResponse>
) {
    console.log("handler de save band")
    const uid = getUidFromRequest(req)
    const band = JSON.parse(req.body) as IBandUpload
    console.log(band)
    if(band.id){
        //esto igual hay que testearlo
        if(await userCanEditBand(uid, band.id)==false){
            console.log(uid, band.id)
            res.status(403).json({message: "You can't do that!"})
        }
    }
  
    const bandToUpload: IBand = {
        id: band.id?band.id:band.name.toLocaleLowerCase().replaceAll(" ", ""),
        description: band.description,
        genres: band.genres?.split(", "),
        name: band.name,
        theme: {
            backdrop: band.backdrop,
            borders: band.borders,
            opacity: band.opacity,
            primary: band.primary,
            secondary: band.secondary,
            rounded: band.round
        },
        isLive: false,
        userId: uid
    }
    const responseSaveBand = await fetch(`http://localhost:3001/bands/${band.id?band.id:""}`, {
        method: band.id?"PUT":"POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(bandToUpload)
        
    })
    //console.log(responseSaveBand)
    res.status(200).json({message:"Band successfully loaded", band: bandToUpload})
}
