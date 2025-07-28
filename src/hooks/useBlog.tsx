import { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";

// Custom hook for easy access
export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog must be used inside BlogProvider");
    }
    return context;
};
