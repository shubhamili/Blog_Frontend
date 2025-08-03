// import { useState, useEffect } from "react";
// import BlogCard from "../components/BlogCard";
// import Spinner from "../components/Spinner";
// import { useAuth } from "../hooks/useAuth";

// interface Post {
//     _id: string;
//     content: string;
//     postPicture?: string;
//     createdAt: string;
//     updatedAt: string;
//     author: {
//         _id: string;
//         userName: string;
//         email: string;
//     };
// }

// interface UserPostsResponse {
//     success: boolean;
//     posts: Post[];
//     message?: string;
// }

// const Profile: React.FC = () => {
//     const { user } = useAuth(); // Get user from auth context
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>("");
//     const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');

//     const fetchUserPosts = async (): Promise<void> => {
//         try {
//             setLoading(true);
//             const response = await fetch('http://localhost:3000/api/post/getUserPosts', {
//                 method: 'GET',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {
//                 const data: UserPostsResponse = await response.json();
//                 if (data.success) {
//                     setPosts(data.posts);
//                 } else {
//                     setError(data.message || "Failed to fetch posts");
//                 }
//             } else {
//                 setError("Failed to fetch posts");
//             }
//         } catch (err) {
//             console.error("Error fetching user posts:", err);
//             setError("Network error. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUserPosts();
//     }, []);

//     const formatDate = (dateString: string): string => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     if (!user) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-lg text-gray-600">Please log in to view your profile</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Profile Header */}
//             <div className="bg-white shadow-sm">
//                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                         {/* Profile Avatar */}
//                         <div className="flex-shrink-0">
//                             <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                                 {user.userName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
//                             </div>
//                         </div>

//                         {/* Profile Info */}
//                         <div className="flex-1 text-center sm:text-left">
//                             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//                                 {user.userName || 'User'}
//                             </h1>
//                             <p className="text-gray-600 mb-4">{user.email}</p>

//                             {/* Stats */}
//                             <div className="flex justify-center sm:justify-start gap-6 text-sm">
//                                 <div>
//                                     <span className="font-semibold text-gray-900">{posts.length}</span>
//                                     <span className="text-gray-600 ml-1">Posts</span>
//                                 </div>
//                                 <div>
//                                     <span className="font-semibold text-gray-900">
//                                         {user.createdAt ? formatDate(user.createdAt) : 'Member since'}
//                                     </span>
//                                     <span className="text-gray-600 ml-1">Joined</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Edit Profile Button */}
//                         <div className="flex-shrink-0">
//                             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//                                 Edit Profile
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Tab Navigation */}
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="border-b border-gray-200">
//                     <nav className="-mb-px flex space-x-8">
//                         <button
//                             onClick={() => setActiveTab('posts')}
//                             className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'posts'
//                                     ? 'border-blue-500 text-blue-600'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                 }`}
//                         >
//                             Posts ({posts.length})
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('about')}
//                             className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'about'
//                                     ? 'border-blue-500 text-blue-600'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                 }`}
//                         >
//                             About
//                         </button>
//                     </nav>
//                 </div>
//             </div>

//             {/* Tab Content */}
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {activeTab === 'posts' && (
//                     <div>
//                         {loading ? (
//                             <div className="flex justify-center">
//                                 <Spinner />
//                             </div>
//                         ) : error ? (
//                             <div className="text-center py-8">
//                                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md inline-block">
//                                     {error}
//                                 </div>
//                                 <button
//                                     onClick={fetchUserPosts}
//                                     className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors block mx-auto"
//                                 >
//                                     Try Again
//                                 </button>
//                             </div>
//                         ) : posts.length === 0 ? (
//                             <div className="text-center py-16">
//                                 <div className="mb-4">
//                                     <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
//                                 <p className="text-gray-600 mb-4">Share your first thought with the world!</p>
//                                 <button
//                                     onClick={() => window.location.href = '/create'}
//                                     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     Create Your First Post
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="space-y-6">
//                                 {posts.map((post) => (
//                                     <BlogCard key={post._id} post={post} />
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {activeTab === 'about' && (
//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <h2 className="text-xl font-semibold text-gray-900 mb-6">About</h2>

//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                                 <p className="text-gray-900">{user.userName || 'Not set'}</p>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                                 <p className="text-gray-900">{user.email}</p>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
//                                 <p className="text-gray-900">
//                                     {user.createdAt ? formatDate(user.createdAt) : 'Unknown'}
//                                 </p>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
//                                 <p className="text-gray-500 text-sm font-mono">{user.id || user._id}</p>
//                             </div>
//                         </div>

//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-lg font-medium text-gray-900 mb-4">Account Statistics</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <div className="bg-gray-50 p-4 rounded-lg">
//                                     <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
//                                     <div className="text-sm text-gray-600">Total Posts</div>
//                                 </div>
//                                 <div className="bg-gray-50 p-4 rounded-lg">
//                                     <div className="text-2xl font-bold text-green-600">Active</div>
//                                     <div className="text-sm text-gray-600">Account Status</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;


import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"; // assuming you have this hook
import API from "../services/Api";
import { getProfilePosts } from "../services/Blog";

interface Post {
    _id: string;
    content: string;
    postPicture?: string;
    createdAt: string;
}

const Profile: React.FC = () => {
    const { user } = useAuth(); // from AuthContext
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                console.log("Fetching user posts for:", user?._id || user?.email);

                const res = await getProfilePosts();
                console.log("Fetched user posts:", res);

                setPosts(res.posts || []);
            } catch (err: any) {
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.profilePicture || "https://via.placeholder.com/80"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{user?.userName}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
            <div className="space-y-4">
                {posts.length === 0 ? (
                    <p className="text-gray-500">You haven’t posted anything yet.</p>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="bg-white p-4 rounded shadow">
                            <p className="text-gray-800">{post.content}</p>
                            {post.postPicture && (
                                <img
                                    src={post.postPicture}
                                    alt="Post"
                                    className="mt-2 rounded max-h-64 object-cover"
                                />
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                                Posted on {new Date(post.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Profile;
