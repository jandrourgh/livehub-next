import { JwtPayload } from "jsonwebtoken";

export interface IToken extends JwtPayload {
    uid: number,
}