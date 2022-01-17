import { IUser } from "./IUser";

export interface IBlog {
    _id?: string;
    user: string | IUser;
    title: string;
    content: string;
    description: string;
    thumbnail: string | File;
    category: string;
    createdAt: string;
}