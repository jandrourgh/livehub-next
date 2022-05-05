import { ITheme } from "./Theme"
export interface IBand{
    id: string,
    userId: number,
    name: string,
    genres: string[],
    isLive: boolean,
    theme: ITheme
}