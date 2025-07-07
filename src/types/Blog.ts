import { User } from "./User";

export interface Blog {
    _id: string;
    content: string;
    author: User | null;
    postPicture?: string;
    createdAt: string;
    updatedAt: string;
    likes: string[],
    comments: string[],
}
