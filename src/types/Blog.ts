import { Comment } from "./Comment";
import { User } from "./User";

// export interface Blog {
//     _id: string;
//     content: string;
//     author: User | null;
//     postPicture?: string;
//     createdAt: string;
//     updatedAt: string;
//     likes: string[];        // user IDs
//     comments: Comment[];
// }
export interface Blog {
    _id: string;
    content: string;
    postPicture: string;
    createdAt: string;
    author: {
        _id: string;
        userName: string;
        profilePicture: string;
    };
    likes: {
        _id: string;
        userName: string;
        profilePicture: string;
    }[];
    comments: {
        _id: string;
        comment: string;
        createdAt: string;
        user: {
            _id: string;
            userName: string;
            profilePicture: string;
        };
    }[];
}


export interface LikeResponse {
    statusCode: number;
    success: boolean;
    message: {
        totalLikes: number;
    };
    data: string; // e.g., "Liked successfully"
}
