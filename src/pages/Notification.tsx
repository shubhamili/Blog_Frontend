// import React, { useState, useEffect } from 'react';
// import { Bell, Heart, MessageCircle, UserPlus, ArrowLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const NotificationsPage: React.FC = () => {
//     // const [notifications, setNotifications] = useState<string[]>([]);
//     // const [loading, setLoading] = useState(true);
//     // const { getNotifications } = useAuth();

//     // useEffect(() => {
//     //     // Replace this with your actual API call
//     //     const fetchNotifications = async () => {
//     //         try {
//     //             const res = await getNotifications();
//     //             setNotifications(res.data);
//     //             setLoading(false);
//     //         } catch (error) {
//     //             console.error("Error fetching notifications:", error);
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchNotifications();
//     // }, []);

//     // const formatDate = (dateString: string): string => {
//     //     const date = new Date(dateString);
//     //     const now = new Date();
//     //     const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

//     //     if (diffInHours < 1) {
//     //         const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
//     //         return `${diffInMinutes}m ago`;
//     //     } else if (diffInHours < 24) {
//     //         return `${diffInHours}h ago`;
//     //     } else {
//     //         const diffInDays = Math.floor(diffInHours / 24);
//     //         return `${diffInDays}d ago`;
//     //     }
//     // };

//     // // const getNotificationIcon = (type: string) => {
//     // //     switch (type) {
//     // //         case 'like':
//     // //             return <Heart className="w-5 h-5 text-gray-600" />;
//     // //         case 'comment':
//     // //             return <MessageCircle className="w-5 h-5 text-gray-600" />;
//     // //         case 'follow':
//     // //             return <UserPlus className="w-5 h-5 text-gray-600" />;
//     // //         default:
//     // //             return <Bell className="w-5 h-5 text-gray-600" />;
//     // //     }
//     // // };

//     // // const markAsRead = (notificationId: string) => {
//     // //     setNotifications(prev =>
//     // //         prev.map(notification =>
//     // //             notification._id === notificationId
//     // //                 ? { ...notification, read: true }
//     // //                 : notification
//     // //         )
//     // //     );
//     // //     // Add API call to mark notification as read
//     // // };

//     // const markAllAsRead = () => {
//     //     setNotifications(prev =>
//     //         prev.map(notification => ({ ...notification, read: true }))
//     //     );
//     //     // Add API call to mark all notifications as read
//     // };

//     // if (loading) {
//     //     return (
//     //         <div className="min-h-screen bg-black p-4">
//     //             <div className="max-w-4xl mx-auto">
//     //                 <div className="bg-white border border-gray-200 rounded-lg p-8">
//     //                     <div className="animate-pulse space-y-4">
//     //                         <div className="h-6 bg-gray-200 rounded w-1/4"></div>
//     //                         <div className="space-y-3">
//     //                             <div className="h-4 bg-gray-200 rounded"></div>
//     //                             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//     //                             <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     );
//     // }

//     // return (
//     //     <div className="min-h-screen bg-black p-4">
//     //         <div className="max-w-4xl mx-auto">
//     //             {/* Header */}
//     //             <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-lg">
//     //                 <div className="flex items-center justify-between">
//     //                     <div className="flex items-center gap-4">
//     //                         <Link
//     //                             to="/"
//     //                             className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
//     //                         >
//     //                             <ArrowLeft className="w-5 h-5 text-gray-600" />
//     //                         </Link>
//     //                         <div>
//     //                             <h1 className="text-2xl font-semibold text-black">Notifications</h1>
//     //                             <p className="text-gray-500 text-sm">Stay updated with your latest activity</p>
//     //                         </div>
//     //                     </div>

//     //                     {notifications.some(n => !n.read) && (
//     //                         <button
//     //                             onClick={markAllAsRead}
//     //                             className="text-sm text-gray-600 hover:text-black font-medium"
//     //                         >
//     //                             Mark all as read
//     //                         </button>
//     //                     )}
//     //                 </div>
//     //             </div>

//     //             {/* Notifications List */}
//     //             <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
//     //                 {notifications.length === 0 ? (
//     //                     <div className="text-center py-12">
//     //                         <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//     //                         <h3 className="text-lg font-medium text-gray-600 mb-2">No notifications yet</h3>
//     //                         <p className="text-gray-500">When you get likes, comments, or new followers, they'll appear here.</p>
//     //                     </div>
//     //                 ) : (
//     //                     <div className="divide-y divide-gray-200">
//     //                         {notifications.map((notification) => (
//     //                             <div
//     //                                 key={notification._id}
//     //                                 className={`p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${!notification.read ? 'bg-gray-50' : ''
//     //                                     }`}
//     //                                 onClick={() => markAsRead(notification._id)}
//     //                             >
//     //                                 <div className="flex items-start gap-4">
//     //                                     {/* User Avatar */}
//     //                                     {notification.fromUser && (
//     //                                         <img
//     //                                             src={notification.fromUser.profilePicture}
//     //                                             alt={notification.fromUser.userName}
//     //                                             className="w-12 h-12 rounded-full object-cover border border-gray-200"
//     //                                         />
//     //                                     )}

//     //                                     {/* Notification Content */}
//     //                                     <div className="flex-1">
//     //                                         <div className="flex items-center gap-2 mb-1">
//     //                                             {getNotificationIcon(notification.type)}
//     //                                             <p className="text-gray-900 font-medium">
//     //                                                 {notification.message}
//     //                                             </p>
//     //                                             {!notification.read && (
//     //                                                 <div className="w-2 h-2 bg-black rounded-full"></div>
//     //                                             )}
//     //                                         </div>

//     //                                         {notification.post && (
//     //                                             <p className="text-gray-600 text-sm mb-2 truncate">
//     //                                                 "{notification.post.content}"
//     //                                             </p>
//     //                                         )}

//     //                                         <p className="text-gray-500 text-sm">
//     //                                             {formatDate(notification.createdAt)}
//     //                                         </p>
//     //                                     </div>

//     //                                     {/* Action Button */}
//     //                                     <div className="flex-shrink-0">
//     //                                         {notification.type === 'follow' && (
//     //                                             <button className="bg-black text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
//     //                                                 Follow Back
//     //                                             </button>
//     //                                         )}
//     //                                     </div>
//     //                                 </div>
//     //                             </div>
//     //                         ))}
//     //                     </div>
//     //                 )}
//     //             </div>

//     //             {/* Load More Button - if you have pagination */}
//     //             {notifications.length > 0 && (
//     //                 <div className="text-center mt-6">
//     //                     <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200">
//     //                         Load More
//     //                     </button>
//     //                 </div>
//     //             )}
//     //         </div>
//     //     </div>
//     // );
// };

// export default NotificationsPage;