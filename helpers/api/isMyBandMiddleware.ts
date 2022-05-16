import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { userCanEditBand } from "./userCanEditBand";
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { Request } from "express";

export const isMyBandMiddleware = async (req: Request, res: NextApiResponse, next: NextHandler) => {
    try{
        const uid = getUidFromRequest(req)
        if (await userCanEditBand(uid, req.body.band)){
            next()
        } else {
            res.status(403).json({error: "Your are not authorized"})
        }
    } catch(err: any) {
        res.status(401).json({error: `Something bad happened: ${err}`})
    }
}