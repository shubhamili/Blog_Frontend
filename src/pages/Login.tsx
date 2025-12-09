import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { LoginPayload } from "../types/Auth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import socket from "../socket";
import GoogleAuth from "../components/GoogleAuth";


const Login: React.FC = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<LoginPayload>({
        userName: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login(formData);
            console.log("Login response", res);
            if (!res.success) {
                console.log("Login failed", res);
                toast.error("Login failed!");
                return;
            }
            localStorage.setItem("userId", res.user.id);
            toast.success(res.success || "Login successful!");
            socket.connect();
            navigate("/");
        } catch (err: any) {
            console.error("Login error", err);
            const message = err?.response.data.msg || "Login failed!";
            toast.error(message);
        }
    };




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full flex flex-col items-center bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6 tracking-tight">
                    Log In
                </h2>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                name="userName"
                                autoComplete="username"
                                required
                                placeholder="Username"
                                value={formData.userName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm transition-all duration-200"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                autoComplete="current-password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm pr-10 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>
                    </form>
                )}

                <p className="text-center text-sm mt-5 text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-indigo-500 hover:underline font-medium">
                        Register
                    </Link>
                </p>

                <br className="mb-5" />
                <GoogleAuth />
            </div>




        </div>
    );
};

export default Login;