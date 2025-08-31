

// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import { Bell } from "lucide-react";

// // CSS-in-JS styles
// const dropdownAnimation = {
//   animation: 'fadeIn 0.2s ease-out',
// } as React.CSSProperties;

// const Navbar: React.FC = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [notifications, setNotifications] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const { getNotifications } = useAuth();

//   const handleLogout = async () => {
//     try {
//       const res = await logout();
//       if (!res.success) {
//         toast.error(res.message);
//         return;
//       }
//       toast.success(res.message);
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       setNotificationsOpen(!notificationsOpen)
//       const res = await getNotifications();
//       setNotifications(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3 px-4 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors group"
//         >
//           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
//             B
//           </div>
//           <span className="hidden sm:block">Blogify</span>
//         </Link>

//         {/* Navigation Items */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <>
//               {/* Create Post Button */}
//               <Link
//                 to="/create"
//                 className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Create
//               </Link>

//               {/* Mobile Create Button */}
//               <Link
//                 to="/create"
//                 className="sm:hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//               </Link>

//               {/* Notifications Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={fetchNotifications}
//                   className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   <Bell className="w-6 h-6 text-gray-600" />
//                   {/* Notification badge - you can conditionally show this based on unread count */}
//                   <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     {loading ? '...' : notifications.length}
//                   </div>
//                 </button>

//                 {/* Notifications Dropdown */}
//                 {notificationsOpen && (
//                   <div
//                     className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
//                     style={dropdownAnimation}
//                   >
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <h3 className="font-semibold text-gray-900">Notifications</h3>
//                     </div>

//                     <div className="max-h-64 overflow-y-auto">



//                       {/* You'll replace this with your actual notifications data */}
//                       <div className="px-4 py-3 hover:bg-gray-50 transition-colors">

//                         {loading ? (
//                           <p className="text-sm text-gray-600">Loading...</p>
//                         ) :
//                           (
//                             notifications.map((note, index) => (
//                               <div key={index} className="mb-2 last:mb-0">
//                                 <p className="text-sm text-gray-800">{note}</p>
//                                 <hr className="my-2 border-gray-200" />
//                               </div>
//                             ))
//                           )

//                         }

//                       </div>

//                       <div className="border-t border-gray-100 p-2">
//                         <Link
//                           to="/all-notifications"
//                           onClick={() => setNotificationsOpen(false)}
//                           className="block w-full text-center py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
//                         >
//                           View all notifications
//                         </Link>
//                       </div>
//                     </div>
//                 )}
//                   </div>

//               {/* Profile Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 transition-all duration-300 group"
//                   >
//                     <div className="hidden sm:block text-right">
//                       <p className="text-sm font-medium text-gray-900">
//                         {user.userName || "User"}
//                       </p>
//                       <p className="text-xs text-gray-500">{user.email}</p>
//                     </div>

//                     <div className="relative">
//                       <img
//                         src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.userName || user.email)}&background=6366f1&color=fff&size=128`}
//                         alt="Profile"
//                         className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all duration-300 shadow-md"
//                       />
//                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
//                     </div>

//                     <svg
//                       className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {/* Dropdown Menu */}
//                   {dropdownOpen && (
//                     <div
//                       className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
//                       style={dropdownAnimation}
//                     >
//                       <div className="px-4 py-3 border-b border-gray-100">
//                         <p className="font-medium text-gray-900">{user.userName || "User"}</p>
//                         <p className="text-sm text-gray-500">{user.email}</p>
//                       </div>

//                       <Link
//                         to="/profile"
//                         onClick={() => setDropdownOpen(false)}
//                         className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                       >
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                         </svg>
//                         Your Profile
//                       </Link>

//                       <Link
//                         to="/settings"
//                         onClick={() => setDropdownOpen(false)}
//                         className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                       >
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         Settings
//                       </Link>

//                       <div className="border-t border-gray-100 mt-2">
//                         <button
//                           onClick={() => {
//                             setDropdownOpen(false);
//                             handleLogout();
//                           }}
//                           className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                           </svg>
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//               ) : (
//               <div className="flex items-center gap-3">
//                 <Link
//                   to="/login"
//                   className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//           )}
//             </div>
//         </div>

//         {/* Click outside to close dropdowns */}
//         {(dropdownOpen || notificationsOpen) && (
//           <div
//             className="fixed inset-0 z-40"
//             onClick={() => {
//               setDropdownOpen(false);
//               setNotificationsOpen(false);
//             }}
//           ></div>
//         )}

//         {/* Global styles for animation */}
//         <style dangerouslySetInnerHTML={{
//           __html: `
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `
//         }} />
//     </nav>
//   );
// };

// export default Navbar;










import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import { Bell } from "lucide-react";

interface User {
  userName?: string;
  email: string;
  profilePicture?: string;
}

const Navbar: React.FC = () => {
  const { user, logout, getNotifications } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      setNotificationsOpen(!notificationsOpen);
      if (!notificationsOpen) {
        const res = await getNotifications();
        setNotifications(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  return (
    <nav className="w-full bg-white border-b py-3 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900">
          Blogify
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Create Post Button */}
              <Link
                to="/create"
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Create
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={fetchNotifications}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {loading ? "..." : notifications.length}
                  </div>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded border shadow py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {loading ? (
                        <p className="px-4 py-2 text-sm text-gray-600">Loading...</p>
                      ) : (
                        notifications.map((note, index) => (
                          <div key={index} className="px-4 py-2">
                            <p className="text-sm text-gray-800">{note}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <Link
                      to="/all-notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className="block px-4 py-2 text-sm text-blue-600"
                    >
                      View all
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                >
                  <img
                    src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.userName || user.email)}&background=6366f1&color=fff&size=128`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user.userName || "User"}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded border shadow py-2 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(dropdownOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setDropdownOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;