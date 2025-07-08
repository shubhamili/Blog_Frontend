// import { useEffect, useState } from "react";
// import { getBlogById, deleteBlog } from "@/api/blog";
// import { Blog } from "@/types/Blog";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAppSelector } from "@/hooks/useAppSelector";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

// const BlogDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAppSelector((state) => state.auth);
//     const [blog, setBlog] = useState<Blog | null>(null);

//     useEffect(() => {
//         const fetchBlog = async () => {
//             try {
//                 const res = await getBlogById(id!); // Assume API returns { data: {...} }
//                 setBlog(res.data); // ✅ Adjusted for actual structure
//             } catch {
//                 alert("Blog not found.");
//                 navigate("/");
//             }
//         };
//         fetchBlog();
//     }, [id, navigate]);

//     const handleDelete = async () => {
//         if (!confirm("Are you sure you want to delete this blog?")) return;
//         try {
//             await deleteBlog(blog!._id);
//             navigate("/home");
//         } catch {
//             alert("Failed to delete blog.");
//         }
//     };

//     if (!blog) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

//     const isAuthor = user?._id === blog.author?._id;

//     return (
//         <div className="max-w-3xl mx-auto px-4 py-10">
//             <Card className="rounded-2xl overflow-hidden">
//                 {blog.postPicture && (
//                     <div className="w-full max-h-[500px] overflow-hidden rounded-t-md flex justify-center bg-muted">
//                         <img
//                             src={blog.postPicture}
//                             alt="Blog"
//                             className="w-auto h-auto max-h-[500px] object-contain rounded"
//                         />
//                     </div>
//                 )}


//                 <CardContent className="p-6 space-y-4">
//                     <div className="text-sm text-gray-500 flex justify-between">
//                         <span>By <strong>{blog.author?.userName || "Anonymous"}</strong></span>
//                         <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//                     </div>

//                     <p className="text-xl text-gray-800 whitespace-pre-line">
//                         {blog.content}
//                     </p>

//                     {!isAuthor && (
//                         <div className="flex gap-4 pt-6">
//                             <Button
//                                 variant="outline"
//                                 onClick={() => navigate(`/blogs/${blog._id}/edit`)}
//                             >
//                                 ✏️ Edit
//                             </Button>
//                             <Button variant="destructive" onClick={handleDelete}>
//                                 🗑️ Delete
//                             </Button>
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default BlogDetail;




import { useEffect, useState } from "react";
import { getBlogById, deleteBlog, likePost, addComment } from "@/api/blog";
import { Blog } from "@/types/Blog";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await getBlogById(id!);
                setBlog(res.data);
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

    const handleLike = async () => {
        try {
            await likePost(blog!._id);
            const updatedLikes = blog!.likes.includes(user!.id)
                ? blog!.likes.filter((u) => u !== user!.id)
                : [...blog!.likes, user!.id];
            setBlog({ ...blog!, likes: updatedLikes });
        } catch {
            alert("Failed to like the post.");
        }
    };

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        try {
            const res = await addComment(blog!._id, commentText);
            setBlog({ ...blog!, comments: [...blog!.comments, res.comment] });
            setCommentText("");
        } catch {
            alert("Failed to add comment.");
        }
    };

    if (!blog) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    const isAuthor = user?._id === blog.author?._id;
    const hasLiked = blog.likes.includes(user?.id || "");

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            <Card className="rounded-2xl overflow-hidden">
                {blog.postPicture && (
                    <div className="w-full max-h-[500px] overflow-hidden rounded-t-md flex justify-center bg-muted">
                        <img
                            src={blog.postPicture}
                            alt="Blog"
                            className="w-auto h-auto max-h-[500px] object-contain rounded"
                        />
                    </div>
                )}

                <CardContent className="p-6 space-y-4">
                    <div className="text-sm text-gray-500 flex justify-between">
                        <span>By <strong>{blog.author?.userName || "Anonymous"}</strong></span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>

                    <p className="text-xl text-gray-800 whitespace-pre-line">
                        {blog.content}
                    </p>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={handleLike}>
                            {hasLiked ? "💖 Liked" : "🤍 Like"} ({blog.likes.length})
                        </Button>

                        {!isAuthor && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/blogs/${blog._id}/edit`)}
                                >
                                    ✏️ Edit
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    🗑️ Delete
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Comments Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">💬 Comments</h3>

                {blog.comments.length === 0 ? (
                    <p className="text-muted-foreground">No comments yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {blog.comments.map((c, i) => (
                            <li key={i} className="text-sm border rounded px-3 py-2">
                                <span className="font-semibold">{c.user?.userName || "Anonymous"}:</span> {c.comment}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex gap-2 mt-4">
                    <Input
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button onClick={handleAddComment}>Post</Button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
