import { IEmployee } from "./User";

export interface IPost {
    title: string,
    body: string,
    id: number,
    uid: number
}

export interface IPostUpload {
    title: string,
    body: string,
    uid: number,
}

export interface IPostEdit {
    title: string,
    body: string,
    id: number,
    
}