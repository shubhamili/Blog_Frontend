import { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "@/api/blog";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [content, setContent] = useState("");
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await getBlogById(id!);
                setContent(res.data.content);
                setExistingImage(res.data.postPicture || null);
            } catch (err) {
                alert("Failed to load blog.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleUpdate = async () => {
        if (!content && !existingImage) {
            alert("Content and image are required.");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);

        // ✅ only send new image if selected
        if (newImage) {
            formData.append("postPicture", newImage);
        }

        try {
            await updateBlog(id!, formData);
            navigate(`/blogs/${id}`);
        } catch (err) {
            alert("Failed to update blog.");
        }
    };
      

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
            <h1 className="text-3xl font-bold">Edit Blog</h1>

            {existingImage && (
                <div className="w-full max-h-[400px] overflow-hidden rounded-md">
                    <img
                        src={existingImage}
                        alt="Current blog"
                        className="w-full object-contain rounded"
                    />
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    required
                />
            </div>

            <div className="space-y-2 border-amber-700">
                <Label htmlFor="image">Upload New Image</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                    required
                />
            </div>

            <Button onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating..." : "Update Blog"}
            </Button>
        </div>
    );
};

export default EditBlog;
