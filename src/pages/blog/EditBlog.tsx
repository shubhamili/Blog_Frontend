import { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "@/api/blog";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blog = await getBlogById(id!);
                setTitle(blog.title);
                setContent(blog.content);
            } catch (err) {
                alert("Failed to load blog.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await updateBlog(id!, { title, content });
            navigate(`/blogs/${id}`);
        } catch (err) {
            alert("Failed to update blog.");
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
            <h1 className="text-3xl font-bold">Edit Blog</h1>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} />
            <Button onClick={handleUpdate}>Update Blog</Button>
        </div>
    );
};

export default EditBlog;
