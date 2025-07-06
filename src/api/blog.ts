import axios from "./config";
import { Blog } from "@/types/Blog";

export const getBlogById = async (id: string): Promise<Blog> => {
    const res = await axios.get(`/blogs/${id}`);
    return res.data;
};



interface PaginatedBlogResponse {
    posts: Blog[];
    totalPosts: number;
    currentPage: number;
    totalPages: number;
    postsPerPage: number;
}

export const getAllBlogs = async (page = 1, limit = 5): Promise<PaginatedBlogResponse> => {
    const res = await axios.get(`/post/get-all-posts?page=${page}&limit=${limit}`);
    return res.data;
};








export const createBlog = async (data: Partial<Blog>): Promise<Blog> => {
    const res = await axios.post("/blogs", data);
    return res.data;
};

export const updateBlog = async (id: string, data: Partial<Blog>): Promise<Blog> => {
    const res = await axios.put(`/blogs/${id}`, data);
    return res.data;
};

export const deleteBlog = async (id: string): Promise<{ message: string }> => {
    const res = await axios.delete(`/blogs/${id}`);
    return res.data;
};
