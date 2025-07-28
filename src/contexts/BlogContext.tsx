import {
    createContext,
    useState,
    type ReactNode,
} from "react";
import type { BlogContextType, postModel } from "../types/Blog";
import {
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    getAllBlogs,
} from "../services/Blog";

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<postModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await getAllBlogs();
            setBlogs(data.posts);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BlogContext.Provider
            value={{
                blogs,
                setBlogs,
                loading,
                fetchBlogs,
                createPost,
                updatePost,
                deletePost,
                likePost,
                addComment,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};
