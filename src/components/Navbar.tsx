import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout()
      console.log("Logout response", res);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message)
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          📝 Blogify
        </Link>

        {/* Nav items */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-gray-700 hidden sm:block">
                Hello, {user.userName}
              </span>
              <img
                src={user.profilePicture || "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
