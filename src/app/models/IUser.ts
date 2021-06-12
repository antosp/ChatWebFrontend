import { IChat } from "./IChat";
import { IMessage } from "./IMessage";

export interface IUser {
    token: string;
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    messages: Array<IMessage>;
    chats: Array<IChat>;
}