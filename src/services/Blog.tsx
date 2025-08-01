

import type { Comment, CommentResponse, createEditPostPayload, likePostReponse, PaginatedBlogResponse, postModel } from "../types/Blog";
import API from "./Api";


// Create a new blog post
export const createPost = async (
    data: createEditPostPayload
): Promise<postModel> => {
    const res = await API.post("/post/create", data);
    return res.data;
};

// Get all blogs (paginated)
export const getAllBlogs = async (
    page: number = 1,
    limit: number = 5
): Promise<PaginatedBlogResponse> => {
    const res = await API.get(`/post/get-all-posts?page=${page}&limit=${limit}`);
    return res.data;
};



// Get detailed blog by ID
export const getDetailedBlog = async (id: string): Promise<postModel> => {
    const res = await API.get(`/post/getSinglePost/${id}`);
    // console.log("Detailed blog data:", res.data.data);
    return res.data.data;

};

// Get all blogs created by logged-in user
export const getUserPosts = async (): Promise<postModel[]> => {
    const res = await API.get("/post/getUserPosts");
    return res.data;
};

// Update blog post
export const updatePost = async (
    id: string,
    data: createEditPostPayload
): Promise<postModel> => {
    const res = await API.post(`/post/updatePost/${id}`, data);
    return res.data;
};

// Delete post
export const deletePost = async (id: string): Promise<{ message: string }> => {
    const res = await API.post(`/post/deletePost/${id}`);
    return res.data;
};

// Like post
export const likePost = async (
    id: string
): Promise<likePostReponse> => {
    const res = await API.post(`/post/likePost/${id}`);
    console.log("Like post response:", res.data);

    return res.data;
};

// Add a comment
export const addComment = async (
    id: string,
    comment: string
): Promise<CommentResponse> => {
    const res = await API.post(`/post/addComment/${id}`, { comment });
    console.log("Add comment response:", res.data);
    return res.data;
};
