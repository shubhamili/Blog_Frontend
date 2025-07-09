import { Blog } from "./Blog";
import { User } from "./User";

export interface Comment {
    _id: string;
    comment: string;
    createdAt: string;
    user: {
        _id: string;
        userName: string;
        profilePicture?: string;
    };
}


export interface CommentResponse {
    success: boolean;
    totalComments: number;
    comment: Comment;
    updatedPost: Blog;
}
