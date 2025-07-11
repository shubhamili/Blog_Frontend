import axios from "./config";
import { Comment } from "@/types/Comment";

// Get all comments for a specific blog/post
export const getCommentsForBlog = async (blogId: string): Promise<Comment[]> => {
    const res = await axios.get(`/blogs/${blogId}/comments`);
    return res.data;
};

// Add a new comment to a blog/post
export const commentOnPost = async (postId: string, comment: string) => {
    const res = await axios.post(`/api/posts/${postId}/comment`, { comment }, { withCredentials: true });
    return res.data;
};

// Delete a specific comment
export const deleteComment = async (commentId: string): Promise<{ message: string }> => {
    const res = await axios.delete(`/comments/${commentId}`);
    return res.data;
};
