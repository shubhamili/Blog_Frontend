import API from "./Api"

export const getAllBlogs = () => { API.get('/post/get-all-posts') }
export const getDetailedBlog = (id: string) => { API.get(`/post/getSinglePost/${id}`) }