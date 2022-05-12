import nextConnect from "next-connect";
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from "next";


const upload = multer({
    storage: multer.diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
  });

  const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        console.log(error.message, req.body)

      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
  
  apiRoute.use(upload.array('image[0]'));
  
  apiRoute.post((req, res) => {
    res.status(200).json({ data: 'success' });
  });
  
  export default apiRoute;
  
  export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };