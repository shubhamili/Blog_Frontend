import React from "react";
import type { postModel } from "../types/Blog";

interface Props {
    post: postModel;
}

const BlogCard: React.FC<Props> = ({ post }) => {
    return (
        <div className="bg-white shadow rounded-md p-4 w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
                <img
                    src={post?.author?.profilePicture || 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'}
                    alt="profile"
                    className="w-10 h-10 rounded-2xl object-cover"
                />
                <div>
                    <p className="font-medium">{post?.author?.email}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {post.postPicture && (
                <img
                    src={post.postPicture}
                    alt="Post"
                    className="rounded-md w-full h-60 object-cover mb-3"
                />
            )}

            <p className="text-gray-700 mb-2">{post.content}</p>

            <div className="flex justify-between text-sm text-gray-600">
                <p>{post.likes.length} Likes</p>
                <p>{post.comments.length} Comments</p>
            </div>
        </div>
    );
};

export default BlogCard;
