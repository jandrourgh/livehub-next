import { ITheme } from "./Theme"
export interface IBand{
    id: string,
    userId: number,
    name: string,
    genres: string[],
    isLive: boolean,
    description: string,
    theme: ITheme
}

export interface IBandUpload{
    name: string,
    genres: string,
    description: string,
    primary: string,
    secondary: string,
    borders: boolean,
    backdrop: boolean,
    opacity: number,
    round: boolean,
    id: string
}