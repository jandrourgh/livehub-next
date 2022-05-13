import { ITheme } from "./Theme"
export interface IBand{
    id: string,
    userId: number,
    name: string,
    genres: string[],
    isLive: boolean,
    theme: ITheme
}

export interface IBandUpload{
    userId: number,
    name: string,
    genres: string[],
    theme: ITheme
    image: File
}