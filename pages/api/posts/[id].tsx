import { getUserDataById } from "helpers/api/getUserDataById";
import { getUidFromRequest } from "helpers/auth/getUidFromRequest";
import { IPost, IPostEdit } from "interfaces/Posts";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"
import initMiddleware from "helpers/api/initMiddleware"

const cors = initMiddleware(
    Cors({
        methods:['GET, POST, OPTIONS']
    })
)

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    await cors(req, res)
	const uid = getUidFromRequest(req);
	const user = await getUserDataById(uid);
	const { id } = req.query as { id: string };
	// const returnData = () => {
	// }
	if (user) {
        const allPostsResponse = await fetch('http://localhost:3001/posts')
		const allPosts: IPost[] = await allPostsResponse.json()
		const thisPost = allPosts.find(
            (post) => post.id == parseInt(id)
            );
            if (thisPost) {
			if (user.role == "employee") {
                if (req.method == "PUT") {
                    const postInRequest = JSON.parse(req.body) as IPostEdit
                    thisPost.body = postInRequest.body
                    thisPost.title = postInRequest.title
                    const updatePostResponse = await fetch(`http://localhost:3001/posts/${id}`, {
                        method:"PUT",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify(thisPost)
                    })
                    if(updatePostResponse.ok){
                        res.status(200).json(thisPost)
                    } else {
                        res.status(500).json({})
                    }     
				} else if (req.method == "DELETE") {
                    const deletePostResponse = await fetch(`http://localhost:3001/posts/${id}`, {
                        method:"DELETE",
                    })
                    if(deletePostResponse.ok){
                        res.status(200).json({a:"a"})
                    } else {
                        res.status(500).json({a:"a"})
                    }     
				}
			} else {
				res.status(403).json({ message: "Invalid user data" });
			}
		} else {
			res.status(404);
		}
	}
}
