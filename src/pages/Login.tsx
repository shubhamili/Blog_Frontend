import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { LoginPayload } from "../types/Auth";
import Spinner from "../components/Spinner";

const Login = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginPayload>({
        userName: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData);
        
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Log In</h2>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="userName"
                            required
                            placeholder="username"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                )}

                <p className="text-center text-sm mt-4 text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
