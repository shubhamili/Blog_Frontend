import { useState } from "react";
import { createBlog } from "@/api/blog";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const blog = await createBlog({ title, content });
            navigate(`/blogs/${blog._id}`);
        } catch (err) {
            alert("Failed to create blog.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
            <h1 className="text-3xl font-bold">Create New Blog</h1>
            <Input placeholder="Blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Write your blog..." rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
            <Button onClick={handleCreate}>Create</Button>
        </div>
    );
};

export default CreateBlog;
