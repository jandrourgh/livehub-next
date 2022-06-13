import { getUserDataById } from "helpers/api/getUserDataById";
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { IPost, IPostUpload } from "interfaces/Posts";
import { IRoom } from "interfaces/Room";
import { IEmployee } from "interfaces/User";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)

interface IRoomsResponse {
    rooms: IRoom[]
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    await cors(req, res)
    if(req.method=="POST"){
        const uid = getUidFromRequest(req)
        const userData = await getUserDataById(uid) as IEmployee
        if(userData.role=="employee"){
            const newPost: IPostUpload = JSON.parse(req.body)
            //console.log(newPost)
            const savePostResponse = await fetch("http://localhost:3001/posts/", {
                method:"POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(newPost)
            })
            const uploadedPost = await savePostResponse.json()
            //console.log(uploadedPost)
            res.status(200).json(uploadedPost)
        } else {
            res.status(403).json({})
        }
    } else if(req.method=="GET") {
        const allPostsResponse = await fetch("http://localhost:3001/posts/", {
            method: "GET"
        })
        const allPosts : IPost[] = await allPostsResponse.json()
        res.status(200).json(allPosts)
    }
}