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
    getDetailedBlog
} from "../services/Blog";

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<postModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await getAllBlogs(1, 5); // or (currentPage, pageSize)
            setBlogs(res.posts);
            // console.log("✅ Blog API Response:", res);

        } finally {
            setLoading(false);
        }
    };

    // console.log(blogs);

    return (
        <BlogContext.Provider
            value={{
                blogs,
                setBlogs,
                loading,
                fetchBlogs,
                getDetailedBlog,
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
