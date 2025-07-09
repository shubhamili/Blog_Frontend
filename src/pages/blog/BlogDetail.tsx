import { useEffect, useState, useCallback, useRef } from "react";
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
    const abortControllerRef = useRef<AbortController | null>(null);

    const [blog, setBlog] = useState<Blog | null>(null);
    const [commentText, setCommentText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isLiking, setIsLiking] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);

    const fetchBlog = useCallback(async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            abortControllerRef.current = new AbortController();

            const res = await getBlogById(id, {
                signal: abortControllerRef.current.signal
            });
            setBlog(res.data);
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error("Failed to fetch blog:", error);
                alert("Blog not found.");
                navigate("/");
            }
        } finally {
            setIsLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        fetchBlog();

        // Cleanup function
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchBlog]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        if (!blog) return;

        try {
            await deleteBlog(blog._id);
            navigate("/home");
        } catch (error) {
            console.error("Failed to delete blog:", error);
            alert("Failed to delete blog.");
        }
    };

    const handleLike = async () => {
        if (!user || !blog || isLiking) return;

        try {
            setIsLiking(true);
            await likePost(blog._id);

            const alreadyLiked = blog.likes.some((u) => u._id === user._id);

            const updatedLikes = alreadyLiked
                ? blog.likes.filter((u) => u._id !== user._id)
                : [
                    ...blog.likes,
                    {
                        _id: user._id,
                        userName: user.userName,
                        profilePicture: user.profilePicture || "/default-avatar.png",
                    }
                ];

            setBlog({ ...blog, likes: updatedLikes });
        } catch (error) {
            console.error("Failed to like post:", error);
            alert("Failed to like post. Please try again.");
        } finally {
            setIsLiking(false);
        }
    };

    const handleAddComment = async () => {
        if (!commentText.trim() || !user || !blog || isCommenting) return;

        try {
            setIsCommenting(true);
            const res = await addComment(blog._id, commentText);
            setBlog({ ...blog, comments: res.updatedPost.comments });
            setCommentText("");
        } catch (error) {
            console.error("Failed to add comment:", error);
            alert("Failed to add comment. Please try again.");
        } finally {
            setIsCommenting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddComment();
        }
    };

    const getProfilePicture = (profilePicture?: string) => {
        return profilePicture || "/default-avatar.png";
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading blog...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center mt-10">
                <p className="text-gray-500">Blog not found.</p>
                <Button onClick={() => navigate("/")} className="mt-4">
                    Go Home
                </Button>
            </div>
        );
    }

    const isAuthor = user?._id === blog.author?._id;
    const hasLiked = blog.likes.some((likeUser) => likeUser._id === user?._id);

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            {/* Blog Card */}
            <Card className="rounded-2xl overflow-hidden shadow">
                {blog.postPicture && (
                    <div className="w-full max-h-[500px] overflow-hidden rounded-t-md flex justify-center bg-muted">
                        <img
                            src={blog.postPicture}
                            alt={`Blog post image for "${blog.content.substring(0, 50)}..."`}
                            className="w-auto h-auto max-h-[500px] object-contain rounded"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <CardContent className="p-6 space-y-4">
                    <div className="text-sm text-gray-500 flex justify-between">
                        <span>
                            By{" "}
                            <strong className="text-primary">
                                {blog.author?.userName || "Anonymous"}
                            </strong>
                        </span>
                        <time dateTime={blog.createdAt}>
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </time>
                    </div>

                    <p className="text-xl text-gray-800 whitespace-pre-line">
                        {blog.content}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                        <Button
                            variant={hasLiked ? "default" : "outline"}
                            onClick={handleLike}
                            disabled={isLiking || !user}
                            aria-label={`${hasLiked ? 'Unlike' : 'Like'} this post`}
                        >
                            {isLiking ? "⏳" : hasLiked ? "❤️ Liked" : "🤍 Like"} ({blog.likes.length})
                        </Button>

                        {isAuthor && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/blogs/${blog._id}/edit`)}
                                    aria-label="Edit this blog post"
                                >
                                    ✏️ Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    aria-label="Delete this blog post"
                                >
                                    🗑️ Delete
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Show who liked */}
                    {blog.likes.length > 0 && (
                        <div className="flex gap-3 flex-wrap text-sm text-gray-600 pt-2">
                            {blog.likes.map((likeUser) => (
                                <div key={likeUser._id} className="flex items-center gap-2">
                                    <img
                                        src={getProfilePicture(likeUser.profilePicture)}
                                        className="w-5 h-5 rounded-full"
                                        alt={`${likeUser.userName}'s profile picture`}
                                        onError={(e) => {
                                            e.currentTarget.src = "/default-avatar.png";
                                        }}
                                    />
                                    <span>{likeUser.userName}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Comments Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">💬 Comments ({blog.comments.length})</h3>

                {blog.comments.length === 0 ? (
                    <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                ) : (
                    <div className="space-y-4" role="list">
                        {blog.comments.map((comment) => (
                            <div key={comment._id} className="border-b py-2" role="listitem">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={getProfilePicture(comment.user.profilePicture)}
                                        alt={`${comment.user.userName}'s profile picture`}
                                        className="w-6 h-6 rounded-full"
                                        onError={(e) => {
                                            e.currentTarget.src = "/default-avatar.png";
                                        }}
                                    />
                                    <span className="font-medium">{comment.user.userName}</span>
                                </div>
                                <p className="ml-8 text-sm text-gray-700">{comment.comment}</p>
                                <time className="ml-8 text-xs text-gray-400" dateTime={comment.createdAt}>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </time>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Comment */}
                {user ? (
                    <div className="flex gap-2 mt-6">
                        <Input
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isCommenting}
                            aria-label="Comment text"
                            maxLength={500}
                        />
                        <Button
                            onClick={handleAddComment}
                            disabled={!commentText.trim() || isCommenting}
                            aria-label="Post comment"
                        >
                            {isCommenting ? "Posting..." : "Post"}
                        </Button>
                    </div>
                ) : (
                    <p className="text-muted-foreground mt-6">Please log in to leave a comment.</p>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;