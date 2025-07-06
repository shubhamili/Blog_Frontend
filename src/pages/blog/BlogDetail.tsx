import { useEffect, useState } from "react";
import { getBlogById, deleteBlog } from "@/api/blog";
import { Blog } from "@/types/Blog";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id!);
                setBlog(data);
            } catch {
                alert("Blog not found.");
                navigate("/");
            }
        };
        fetchBlog();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        try {
            await deleteBlog(blog!._id);
            navigate("/home");
        } catch {
            alert("Failed to delete blog.");
        }
    };

    if (!blog) return <p className="text-center">Loading...</p>;

    const isAuthor = user?._id === blog.author._id;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <p className="text-sm text-gray-500">by {blog.author.name}</p>
            <p className="text-lg text-gray-800 whitespace-pre-line">{blog.content}</p>

            {isAuthor && (
                <div className="flex gap-4 pt-6">
                    <Button variant="outline" onClick={() => navigate(`/blogs/${blog._id}/edit`)}>Edit</Button>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </div>
            )}
        </div>
    );
};

export default BlogDetail;
