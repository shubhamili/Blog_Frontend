




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
        console.log(res.data);

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
                      {/* View all */}
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