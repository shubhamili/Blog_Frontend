import React from "react";
import type { postModel } from "../types/Blog";
import { useNavigate } from "react-router-dom";

interface Props {
    post: postModel;
}
const BlogCard: React.FC<Props> = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            navigate(`/blog/${post._id}`);
        } catch (error) {
            console.error("Could not navigate:", error);
        }
        // console.log("Blog clicked");
    }
    return (
        <div className="bg-white shadow rounded-md p-4 w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
                <img
                    src={post?.author?.profilePicture || 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'}
                    alt="profile"
                    className="w-10 h-10 rounded-2xl object-cover"
                />
                <div>
                    <p className="font-medium">{post?.author?.userName ?? "authorEmail"}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {post.postPicture && (
                <img
                    onClick={handleClick}
                    src={post.postPicture}
                    alt="Post"
                    className="rounded-md w-full h-60 object-contain mb-3"
                />
            )}

            <p
                onClick={handleClick}
                className="text-gray-700 mb-2">{post.content}</p>

            <div className="flex justify-between text-sm text-gray-600">
                <p>{post.likes.length} Likes</p>
                <p>{post.comments.length} Comments</p>
            </div>
        </div>
    );
};

export default BlogCard;
