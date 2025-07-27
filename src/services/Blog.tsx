// import type { createEditPostPayload, postModel } from "../types/Blog"
// import API from "./Api"

// export const createPost = async (data: createEditPostPayload): Promise<postModel> => {
//     const res = await API.post('/post/create', data)
//     return res.data
// }

// export const getAllBlogs = async () => { return await API.get('/post/get-all-posts') }

// export const getDetailedBlog = async (id: string) => { return await API.get(`/post/getSinglePost/${id}`) }

// export const getUserPosts = async () => { return await API.get('/post/getUserPosts') }

// export const updatePost = async (id: string, data: createEditPostPayload) => {
//     return await API.post(`/post/updatePost/${id}`, data)
// }

// export const deletePost = async (id: string) => { return await API.post(`/post/deletePost/${id}`) }

// export const likePost = async (id: string) => { return await API.post(`/post/likePost/${id}`) }

// export const addComment = async (id: string, comment: string) => {
//     return await API.post(`/post/addComment/${id}`, { comment })
// }



import type { createEditPostPayload, PaginatedBlogResponse, postModel } from "../types/Blog";
import API from "./Api";


// Create a new blog post
export const createPost = async (
    data: createEditPostPayload
): Promise<postModel> => {
    const res = await API.post("/post/create", data);
    return res.data;
};

// Get all blogs (paginated)
export const getAllBlogs = async (): Promise<PaginatedBlogResponse> => {
    const res = await API.get("/post/get-all-posts");
    return res.data;
};

// Get detailed blog by ID
export const getDetailedBlog = async (id: string): Promise<postModel> => {
    const res = await API.get(`/post/getSinglePost/${id}`);
    return res.data;
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
): Promise<{ likes: (string | null)[] }> => {
    const res = await API.post(`/post/likePost/${id}`);
    return res.data;
};

// Add a comment
export const addComment = async (
    id: string,
    comment: string
): Promise<Comment> => {
    const res = await API.post(`/post/addComment/${id}`, { comment });
    return res.data;
};
