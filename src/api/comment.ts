import axios from "./config";
import { Comment } from "@/types/Comment";

export const getCommentsForBlog = async (blogId: string): Promise<Comment[]> => {
    const res = await axios.get(`/blogs/${blogId}/comments`);
    return res.data;
};

export const addComment = async (
    blogId: string,
    content: string
): Promise<Comment> => {
    const res = await axios.post(`/blogs/${blogId}/comments`, { content });
    return res.data;
};

export const deleteComment = async (commentId: string): Promise<{ message: string }> => {
    const res = await axios.delete(`/comments/${commentId}`);
    return res.data;
};
