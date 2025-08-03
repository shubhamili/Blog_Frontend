
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Calendar, Edit3, User, ArrowLeft } from "lucide-react";
import Spinner from "../components/Spinner";
import type { postModel } from "../types/Blog";
import { addComment, getDetailedBlog, likePost } from "../services/Blog";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../services/utilServices";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<postModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!id) {
      console.error("No blog ID provided in URL parameters.");
      return;
    }
    const fetchBlog = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await getDetailedBlog(id);
        // console.log("Fetched user:", user);
        // Replace with actual user ID
        setBlog(res);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blog) {
      // console.log("Current user:------------------------------------", user);
      // setIsLiked(user?._id ? blog.likes?.includes(user._id) ?? false : false);
      if (user && user._id) {
        setIsLiked(blog.likes?.includes(user._id) ?? false);
      } else {
        setIsLiked(false);
      }


    }
  }, [blog]);

  const handleLike = async () => {
    if (!id) return;
    try {
      const response = await likePost(id);
      const updatedPost = response.updatedPost;

      setBlog((prev) =>
        prev ? { ...prev, likes: updatedPost.likes } : prev
      );
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleComment = async () => {
    if (!id || !commentText.trim()) return;

    const res = await addComment(id, commentText);

    setBlog((prev) =>
      prev ? { ...prev, comments: res.updatedPost.comments } : prev
    );

    setCommentText("");
  };

  // console.log("Blog =======>:", blog);

  const visibleComments = showAllComments ? blog?.comments : blog?.comments.slice(0, 3);
  // console.log("Visible comments:", visibleComments);

  if (loading) return <Spinner />;

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>

        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Content Card */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          {/* Hero Image */}
          {blog.postPicture && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={blog.postPicture}
                alt="Post cover"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          <div className="p-8">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={blog.author?.profilePicture || 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'}
                    alt="Author"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{blog.author?.email ?? "authorEmail"}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(blog.createdAt)}
                  </div>
                </div>
              </div>

              {blog.updatedAt !== blog.createdAt && (
                <div className="flex items-center text-sm text-gray-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Edit3 className="w-4 h-4 mr-1 text-amber-600" />
                  <span className="text-amber-700">Edited {formatDate(blog.updatedAt)}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{blog.content}</p>
            </div>

            {/* Engagement Bar */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${isLiked
                  ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                  : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200'
                  }`}
              >
                <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${isLiked ? 'fill-current animate-pulse' : ''}`} />
                <span className="font-medium">{blog.likes?.length || 0}</span>
                <span className="text-sm hidden sm:inline">Likes</span>
              </button>

              <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{blog.comments.length}</span>
                <span className="text-sm hidden sm:inline">comments</span>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
              Comments ({blog.comments.length})
            </h3>
          </div>

          {/* Add Comment */}
          <div className="mb-8 bg-gray-50 rounded-xl p-6">
            <div className="flex space-x-4">
              <img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
              />
              <div className="flex-1">
                <textarea
                  className="w-full border-0 bg-white rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm"
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:hover:shadow-sm transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {blog.comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No comments yet</p>
              <p className="text-gray-400 mt-1">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {visibleComments?.map((comment, index) => (
                <div key={index} className="flex space-x-4 group">
                  <img
                    src={comment?.user?.profilePicture || 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'}
                    alt="Commenter"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl px-4 py-3 group-hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.user.userName || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment?.comment || "comment not available"}</p>
                    </div>
                  </div>
                </div>
              ))}

              {blog.comments.length > 3 && (
                <div className="text-center pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors hover:bg-blue-50 rounded-lg"
                  >
                    {showAllComments ? 'Show Less' : `Show ${blog.comments.length - 3} More Comments`}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;