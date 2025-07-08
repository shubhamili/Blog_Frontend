// import { User } from "./User";

// export interface Blog {
//     _id: string;
//     content: string;
//     author: User | null;
//     postPicture?: string;
//     createdAt: string;
//     updatedAt: string;
//     likes: string[],
//     comments: string[],
// }

export interface Blog {
    _id: string;
    content: string;
    author: {
        _id: string;
        email: string;
        profilePicture: string;
        userName?: string;
    } | null;
    postPicture?: string;
    createdAt: string;
    updatedAt: string;
    likes: string[];
    comments: string[];
}
  