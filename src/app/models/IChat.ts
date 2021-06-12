import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChat {
    id: number;
    title: string;
    type: string;
    users: Array<IUser>;
    messages: Array<IMessage>;
    active?: boolean;
}