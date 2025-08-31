import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Calendar, MapPin, Globe, Users, UserPlus } from 'lucide-react';
import type { reqProfileResponse } from '../types/Auth';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const UserProfile: React.FC = () => {
    const [profileData, setProfileData] = useState<reqProfileResponse>();

    const [isFollowing, setIsFollowing] = useState(false);
    const { profileId } = useParams();

    const { reqProfile, followToggle, user } = useAuth();

    useEffect(() => {
        const fetchProfileData = async () => {
            if (profileId) {
                try {
                    const res = await reqProfile(profileId);
                    setProfileData(res);
                    if (user && res.data.followers.some(follower => follower.follower === user.id)) {
                        setIsFollowing(true);
                    }
                    console.log("Profile data:", res);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                }
            } else {
                console.error("No profile ID provided in URL");
            }
        };
        fetchProfileData();
    }, [])

    const handleFollowToggle = async () => {
        try {
            await followToggle(profileId!);
            // Optionally, refresh profile data to reflect new follow status
            const res = await reqProfile(profileId!);
            setProfileData(res);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    }

    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const toggleLike = (postId: string): void => {
        setLikedPosts(prev => {
            const newLiked = new Set(prev);
            if (newLiked.has(postId)) {
                newLiked.delete(postId);
            } else {
                newLiked.add(postId);
            }
            return newLiked;
        });
    };

    console.log("helo", (profileData?.data.userData.createdAt));

    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <img
                                src={profileData?.data.userData?.profilePicture}
                                alt={profileData?.data?.userData?.userName}
                                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-md"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-gray-800 w-6 h-6 rounded-full border-2 border-white"></div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-semibold text-black mb-2">{profileData?.data?.userData?.userName}</h1>
                            <p className="text-gray-600 text-base mb-4">@{profileData?.data?.userData?.userName}</p>

                            {profileData?.data?.userData?.bio && (
                                <p className="text-gray-700 mb-4">{profileData?.data?.userData?.bio}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6 text-sm">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        Joined {profileData?.data?.userData?.createdAt && formatDate(profileData.data.userData.createdAt)}
                                    </span>
                                </div>
                                {profileData?.data?.userData?.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{profileData?.data?.userData?.location}</span>
                                    </div>
                                )}
                                {profileData?.data?.userData?.website && (
                                    <div className="flex items-center gap-1">
                                        <Globe className="w-4 h-4" />
                                        <a href={profileData?.data?.userData?.website} className="text-black hover:underline">
                                            Website
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-8 mb-6">
                                <div className="text-center">
                                    <div className="text-xl font-semibold text-black">{profileData?.data?.followingCount}</div>
                                    <div className="text-gray-500 text-sm">Following</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-semibold text-black">{profileData?.data?.followersCount}</div>
                                    <div className="text-gray-500 text-sm">Followers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-semibold text-black">{profileData?.data?.userPosts?.length}</div>
                                    <div className="text-gray-500 text-sm">Posts</div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleFollowToggle}
                                    className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200">
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
                    <h2 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        Posts ({profileData?.data?.userPosts?.length})
                    </h2>

                    <div className="space-y-6">
                        {profileData?.data?.userPosts?.map((post) => (
                            <div key={post._id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={profileData?.data?.userData?.profilePicture}
                                        alt={profileData?.data?.userData?.userName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-black">{profileData?.data?.userData?.userName}</p>
                                        <p className="text-gray-500 text-sm">{formatDate(post.createdAt)}</p>
                                    </div>
                                </div>

                                <p className="text-gray-900 mb-4 leading-relaxed">{post.content}</p>

                                {post.postPicture && (
                                    <div className="mb-4">
                                        <img
                                            src={post.postPicture}
                                            alt="Post content"
                                            className="w-full max-h-96 object-cover rounded-md"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => toggleLike(post._id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${likedPosts.has(post._id) || post.likes.includes(profileData?.data?.userData?.id)
                                                ? 'text-black bg-gray-100'
                                                : 'text-gray-600 hover:text-black hover:bg-gray-100'
                                                }`}
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${likedPosts.has(post._id) || post.likes.includes(profileData?.data?.userData?.id) ? 'fill-current' : ''
                                                    }`}
                                            />
                                            <span className="font-medium">{post.likes.length}</span>
                                        </button>

                                        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="font-medium">{post.comments.length}</span>
                                        </button>
                                    </div>

                                    <span className="text-gray-500 text-sm">
                                        {formatDate(post.updatedAt)}
                                    </span>
                                </div>

                                {/* Comments Section */}
                                {post.comments.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <h4 className="font-semibold text-black mb-3">Comments</h4>
                                        <div className="space-y-3">
                                            {post.comments.map((comment) => (
                                                <div key={comment._id} className="bg-gray-50 rounded-md p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                                                        <span className="font-medium text-black">User</span>
                                                        <span className="text-gray-500 text-sm">
                                                            {formatDate(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 ml-8">{comment.comment.trim()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {profileData?.data?.userPosts?.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
                            <p className="text-gray-500">When {profileData?.data?.userData?.userName} shares posts, they'll appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;