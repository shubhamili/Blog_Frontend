import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { RegisterPayload } from "../types/Auth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterPayload>({
    email: "",
    password: "",
    userName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      if (res.success) {
        toast.success(res.message || "Registration successful!");
        navigate("/");
      } else {
        toast.error(res.message || "Registration failed!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6 tracking-tight">
          Sign Up
        </h2>

        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="userName"
                required
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;