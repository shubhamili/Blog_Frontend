import { User } from "./User";

export interface Comment {
    _id: string;
    content: string;
    author: User;
    blogId: string;
    createdAt: string;
}
// export interface Comment {
//     comment: string;
//     user: {
//         _id: string;
//         userName: string;
//     };
// }
