import nextConnect from "next-connect";
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from "next";
import {isMyBandMiddleware} from "helpers/api/isMyBandMiddleware";
import {expressjwt} from "express-jwt"
import {json, urlencoded} from "body-parser"
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { userCanEditBand } from "helpers/api/userCanEditBand";


interface NextApiRequestWithFile extends NextApiRequest {
  file: File
}

const upload = multer({
    storage: multer.diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
    // TO-DO: requerir autorización para guardar el archivo
    // fileFilter: async (req, file, cb) => {
    //   const uid = getUidFromRequest(req)
    //   console.log("estoy en filefilter", uid, req.body)
    //   if( await userCanEditBand(uid, req.body.band)){
    //     console.log("es tu grupo")
    //     cb(null, true)
    //   } else {
    //     console.log("no es tu grupo")
    //     cb(null, false)
    //   }
    // }
  });

  const apiRoute = nextConnect<NextApiRequestWithFile, NextApiResponse>({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    
  });

  apiRoute.use(upload.single('image'));
  apiRoute.use(isMyBandMiddleware)
  
  apiRoute.post((req, res) => {
    console.log("dentro de post", req.body.band)
    res.status(200).json({ data: 'success' });
  });
  
  export default apiRoute;
  
  export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };