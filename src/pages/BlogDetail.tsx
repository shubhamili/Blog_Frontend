import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import type { postModel, Comment } from "../types/Blog";
import { getDetailedBlog, addComment, likePost } from "../services/Blog";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<postModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const fetchBlog = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getDetailedBlog(id);
      setBlog(res);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!id) return;
    const updated = await likePost(id);
    setBlog((prev) =>
      prev ? { ...prev, likes: updated.likes as any } : prev
    );
  };

  const handleComment = async () => {
    if (!id || !commentText.trim()) return;
    const newComment: Comment = await addComment(id, commentText);
    setBlog((prev) =>
      prev ? { ...prev, comments: [...prev.comments, newComment] } : prev
    );
    setCommentText("");
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <Spinner />;

  if (!blog) return <p className="text-center mt-10 text-gray-600">Blog not found.</p>;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <img
          src={blog.author.profilePicture}
          alt="Author"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">{blog.author.email}</h2>
          <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
        </div>
      </div>

      {blog.postPicture && (
        <img
          src={blog.postPicture}
          alt="Post"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      <p className="text-gray-700 mb-4">{blog.content}</p>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleLike}
          className="text-blue-600 hover:underline"
        >
          ❤️ {blog.likes.length} Likes
        </button>
        {blog.updatedAt !== blog.createdAt && (
          <span className="text-sm text-gray-500">
            Edited: {formatDate(blog.updatedAt)}
          </span>
        )}
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>

        {blog.comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          blog.comments.map((comment) => (
            <div key={comment._id} className="mb-4">
              <div className="flex items-center mb-1">
                <img
                  src={comment.user.profilePicture}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm font-medium">
                    {comment.user.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="ml-10 text-gray-600">{comment.content}</p>
            </div>
          ))
        )}

        <div className="mt-4">
          <textarea
            className="w-full border p-2 rounded resize-none"
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            onClick={handleComment}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
