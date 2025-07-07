import { useState } from "react";
import { createPost } from "@/api/blog";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddPost = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content || !file) {
            alert("Both content and image are required");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);
        formData.append("postPicture", file);

        try {
            setLoading(true);
            await createPost(formData);
            navigate("/home");
        } catch (err: any) {
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

            <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something amazing..."
                        rows={5}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="file">Upload Image</Label>
                    <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Post"}
                </Button>
            </form>
        </div>
    );
};

export default AddPost;
