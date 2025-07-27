import { createContext, useState, type ReactNode } from "react";
import type { BlogContextType, postModel } from "../types/Blog";
import { getAllBlogs } from "../services/Blog";


export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {

    const [blogs, setBlogs] = useState<postModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBlogs = async () => {
        setLoading(true);
        const data = await getAllBlogs();
        setBlogs(data.posts);
        setLoading(false);
    };

    


}
