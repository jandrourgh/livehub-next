import nextConnect from "next-connect";
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from "next";
import {isMyBandMiddleware} from "helpers/api/isMyBandMiddleware";
import {expressjwt} from "express-jwt"
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { userCanEditBand } from "helpers/api/userCanEditBand";
import { IBand } from "interfaces/Band";


interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File
}

const upload = multer({
    
    storage: multer.diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const format =  file.originalname.split(".")[1]
        if(format != "mp3"){
          return cb(new Error("Invalid file type"), "")
        } else {
          return cb(null, `song_${req.body.band}.${format}`)
        }
      },
    }),
  });

  const apiRoute = nextConnect<NextApiRequestWithFile, NextApiResponse>({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    
  });

  apiRoute.use(upload.single('song'));
  apiRoute.use(isMyBandMiddleware)
  
  apiRoute.post(async (req, res) => {
    const fileName = req.file.filename
    const band = req.body.band
    const songName = req.body.songname
    const getBandResponse = await fetch(`http://localhost:3001/bands/${band}`)
    const bandData = await getBandResponse.json() as IBand
    bandData.songUrl = `/uploads/${fileName}`
    bandData.songName = songName
    const updateBandResponse = await fetch(`http://localhost:3001/bands/${band}`, {
      method:"PUT",
      headers: {"Content-type": "application/json"},

      body: JSON.stringify(bandData)
    })
    res.status(200).json({ data: 'success' });
  });
  
  export default apiRoute;
  
  export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };