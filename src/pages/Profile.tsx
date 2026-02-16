

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProfilePosts, deletePost } from "../services/Blog";
import type { postModel } from "../types/Blog";
import { Link, useNavigate } from "react-router-dom";
import type { followerResponse } from "../types/Auth";

const Profile: React.FC = () => {
    const { user, getFollows } = useAuth();
    const [posts, setPosts] = useState<postModel[]>([]);
    const [follows, setFollows] = useState<followerResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await getProfilePosts();
                setPosts(res.data || []);
            } catch (err: any) {
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };
        const getFollowers = async () => {
            const res = await getFollows(user?.id || "");
            setFollows(res);
        }
        fetchUserPosts();
        getFollowers();
    }, []);


    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleEditPost = async (postId: string) => {
        try {
            navigate(`/edit/${postId}`);
        } catch (err: any) {
            setError("Failed to edit post");
        }
    };

    const handleDeletePost = async () => {
        if (postToDelete) {
            try {
                await deletePost(postToDelete);
                setPosts(posts.filter(post => post._id !== postToDelete));
            } catch (err: any) {
                setError("Failed to delete post");
            } finally {
                setShowDeleteDialog(false);
                setPostToDelete(null);
            }
        }
    };

    const openDeleteDialog = (postId: string) => {
        setPostToDelete(postId);
        setShowDeleteDialog(true);
    };

    const closeDeleteDialog = () => {
        setShowDeleteDialog(false);
        setPostToDelete(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }


    console.log('user.profile', user?.profilePicture)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all animate-slide-up">
                        <div className="flex items-center gap-3 mb-4">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-800">Delete Post</h3>
                        </div>
                        <p className="text-gray-600 mb-6 text-sm">Are you sure you want to delete this post? This action is permanent.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeDeleteDialog}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeletePost}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Profile Picture */}
                    <div className="relative">
                        <img
                            // src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.userName || user?.email || 'User')}&background=4f46e5&color=fff&size=128&bold=true`}
                            src={user?.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white"
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-semibold text-gray-800">{user?.userName || 'User'}</h1>
                        <p className="text-gray-500 text-sm mt-1">{user?.website}</p>
                        <p className="text-gray-500 text-sm mt-1">{user?.bio}</p>
                        <p className="text-gray-500 text-sm mt-1">{user?.location}</p>
                        <div className="flex justify-center sm:justify-start gap-6 mt-4">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-800">{posts.length}</div>
                                <div className="text-xs text-gray-500">Posts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-800">{follows?.data?.followersCount || 0}</div>
                                <div className="text-xs text-gray-500">Follower</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-800">{follows?.data?.followingCount || 0}</div>
                                <div className="text-xs text-gray-500">Following</div>
                            </div>
                            {/* <div className="text-center">
                                <div className="text-lg font-semibold text-gray-800">
                                    {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
                                </div>
                                <div className="text-xs text-gray-500">Joined</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-green-500">Active</div>
                                <div className="text-xs text-gray-500">Status</div>
                            </div> */}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/create"
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Post
                        </Link>
                        <button
                            onClick={() => navigate('/profile/update')}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 text-sm font-medium flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'posts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Posts ({posts.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'about' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            About
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'posts' && (
                            <div>
                                {posts.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
                                        <p className="text-gray-500 text-sm mb-4">Share your thoughts with the world!</p>
                                        <Link
                                            to="/create"
                                            className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 text-sm font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Create Your First Post
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {posts.map(post => (
                                            <div key={post._id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-200">
                                                <div className="flex items-start gap-4">
                                                    <img
                                                        src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.userName || user?.email || 'User')}&background=4f46e5&color=fff&size=64`}
                                                        alt="Author"
                                                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h4 className="text-sm font-semibold text-gray-800">{user?.userName}</h4>
                                                            <span className="text-xs text-gray-400">•</span>
                                                            <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
                                                        </div>
                                                        <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.content}</p>

                                                        {post.postPicture && (
                                                            <div className="rounded-lg overflow-hidden mb-4">
                                                                <img
                                                                    src={post.postPicture}
                                                                    alt="Post"
                                                                    className="w-full max-h-80 object-cover transition-transform duration-300 hover:scale-105"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                            <div className="flex items-center gap-4">
                                                                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors text-sm">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                    </svg>
                                                                    Like
                                                                </button>
                                                                <button className="flex items-center gap-1 text-gray-500 hover:text-indigo-500 transition-colors text-sm">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                                    </svg>
                                                                    Comment
                                                                </button>
                                                                <button
                                                                    onClick={() => handleEditPost(post._id)}
                                                                    className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => openDeleteDialog(post._id)}
                                                                    className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors text-sm"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M9 7v12m6-12v12M3 7h18" />
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Username</span>
                                            <span className="text-gray-800 font-medium">{user?.userName || 'Not set'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Email</span>
                                            <span className="text-gray-800 font-medium">{user?.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Member Since</span>
                                            <span className="text-gray-800 font-medium">
                                                {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Stats</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Posts</span>
                                            <span className="text-indigo-600 font-semibold">{posts.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Account Status</span>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Spacing */}
            <div className="h-16"></div>
        </div>
    );
};

export default Profile;