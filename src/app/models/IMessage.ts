import { IUser } from "./IUser";

export interface IMessage {
    id: number;
    text: string;
    created: string;
    userId: number;
    user: IUser;
}