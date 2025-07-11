import axios from "./config";
import { Blog, LikeResponse } from "@/types/Blog";


interface PaginatedBlogResponse {
    posts: Blog[];
    totalPosts: number;
    currentPage: number;
    totalPages: number;
    postsPerPage: number;
}

export const getAllBlogs = async (page = 1, limit = 10): Promise<PaginatedBlogResponse> => {
    const res = await axios.get(`/post/get-all-posts?page=${page}&limit=${limit}`);
    return res.data;
};



export const getBlogById = async (id: string): Promise<{ data: Blog }> => {
    const res = await axios.get(`/post/getSinglePost/${id}`);
    return res.data; // ✅ contains { success, message, data: blog }
};


export const createPost = async (formData: FormData) => {
    const res = await axios.post("/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

export const updateBlog = async (id: string, formData: FormData) => {
    const res = await axios.put(`/post/updatePost/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const deleteBlog = async (id: string): Promise<{ message: string }> => {
    const res = await axios.delete(`post/deletePost/${id}`);
    return res.data;
};

// src/api/blog.ts

export const likePost = async (postId: string): Promise<LikeResponse> => {
    const res = await axios.post(`/post/likePost/${postId}`);
    return res.data;
};


// export const likePost = async (postId: string) => {
//     // const res = await axios.post(`/post/like/${postId}`);
//     const res = await axios.post(`/post/likePost/${postId}`);
//     return res.data;
// };


export const addComment = async (postId: string, comment: string) => {
    const res = await axios.post(`/post/addComment/${postId}`, { comment });
    return res.data;
};
