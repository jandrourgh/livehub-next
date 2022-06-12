import { IPost, IPostEdit, IPostUpload } from "interfaces/Posts"
import { IEmployee, IUserProfile } from "interfaces/User"
import React, {useEffect, useState} from "react"
import {Modal} from "react-bootstrap"

interface PostsCMSProps {
    token: string,
    userData: IEmployee
}

const PostsCMS = ({token, userData}: PostsCMSProps) => {

    const [posts, setPosts] = useState<IPost[]>([])
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [id, setId] = useState(-1)
    const [error, setError] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [load, setLoad] = useState(true)
    const [showPostsModal, setShowPostsModal] = useState(false)

    const clearPostsForm = () => {
        setShowPostsModal(false)
        setIsEditing(false)
        setId(-1)
        setBody("")
        setTitle("")
    }
    
    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        if(title!="" && body!=""){
            setError(false)
            if(isEditing){
                const editedPost: IPostEdit = {id: id, body: body, title: title}
                //console.log(editedPost)
                const editPostResponse = await fetch(`http://localhost:3000/api/posts/${id}`, {
                    headers: {"Authorization": `Bearer ${token}`},
                    method: "PUT",
                    body: JSON.stringify(editedPost)
                })
                if(editPostResponse.ok){
                    setShowPostsModal(false)
                    setLoad(true)
                    clearPostsForm()
                }
            } else {
                const newPost: IPostUpload = {body: body, title: title, uid: userData.id}
                const newPostResponse = await fetch('http://localhost:3000/api/posts', {
                    headers: {"Authorization": `Bearer ${token}`},
                    method: "POST",
                    body: JSON.stringify(newPost)
                })
                if(newPostResponse.ok){
                    setShowPostsModal(false)
                    setLoad(true)
                    clearPostsForm()
                }
            }
        } else {
            setError(true)
        }
    }

    const deletePost = async (id: number) => {
        console.log(id)
        const deletePostResponse = await fetch(`http://localhost:3000/api/posts/${id}`, {
            headers: {"Authorization": `Bearer ${token}`},
            method:"DELETE"
        })
        if(deletePostResponse.ok){
            setLoad(true)
        }
    }


    useEffect(()=>{
        const fetchData = async () => {
            const getPostsResponse = await fetch('http://localhost:3000/api/posts', {method: "GET"})
            if(getPostsResponse.ok){
                const allPosts = getPostsResponse.json()
                return allPosts
            } else {
                alert("Something went wrong loading posts")
            }
        }
        //console.log("load")
        if(load){
            fetchData().then(data=>{
                setPosts(data)
                setLoad(false)
            })
        }
    }, [load])

    return (<div>
        <div className="d-flex justify-content-between my-3">
            <h2>Posts</h2>
            <button onClick={()=>setShowPostsModal(true)} className="btn btn-dark">New Post</button>

        </div>
        <Modal show={showPostsModal}>
        <form action="" className="p-3" onSubmit={(evt)=>handleSubmit(evt)}>
            <div className="d-flex justify-content-between">
                <h3>{isEditing?`Editing post ${id}`:`New Post`}</h3>
                <span className="btn btn-danger" onClick={()=>{
                    clearPostsForm()
                }}>Close</span>

            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="title">Title</label>
                <input className="form-control" value={title} onChange={(evt)=>setTitle(evt.currentTarget.value)} type="text" id="title" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="body">Body</label>
                <input className="form-control" value={body} onChange={(evt)=>setBody(evt.currentTarget.value)} type="text" id="body" />
            </div>
            <button className="btn btn-dark mt-3" type="submit">Save</button>
        </form>
        </Modal>
        {
            posts.length?<ul className="list-group">
                {
                    posts.map((post, i)=>(
                        <li className="list-group-item d-flex justify-content-between" key={i}><p className="m-0 p-0">{post.body}</p> <div><button className="btn btn-dark" onClick={() => {
                            setShowPostsModal(true)
                            setTitle(post.title)
                            setBody(post.body)
                            setIsEditing(true)
                            setId(post.id)
                        }}>Edit</button> <button className="btn btn-danger" onClick={()=>{
                            deletePost(post.id)
                        }}>Delete</button></div></li>
                    )) 
                }
                </ul>: <></>
        }
    </div>)
}
export default PostsCMS