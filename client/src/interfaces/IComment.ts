import { IUser } from "./IUser";

export interface IComment {
    _id?: string;
    user: IUser;
    blog_id: string;
    blog_user_id: string;
    content: string;
    replyCM: IComment[];
    reply_user?: IUser;
    comment_root?: string;
    createdAt: string;
}