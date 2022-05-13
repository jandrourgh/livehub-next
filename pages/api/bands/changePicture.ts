import nextConnect from "next-connect";
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from "next";
import {isMyBandMiddleware} from "helpers/api/isMyBandMiddleware"

interface NextApiRequestWithFile extends NextApiRequest {
  file: File
}

const upload = multer({
    fileFilter: (req, file, cb) => {
      
    },
    storage: multer.diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
  });

  const apiRoute = nextConnect<NextApiRequestWithFile, NextApiResponse>({
    onError(error, req, res) {
        console.log(error.message, req.body)

      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    
  });
  
  apiRoute.use(isMyBandMiddleware).use(upload.single('image'));
  
  apiRoute.post((req, res) => {
    console.log(req)
    res.status(200).json({ data: 'success' });
  });
  
  export default apiRoute;
  
  export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };