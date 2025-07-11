import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginUser } from "@/api/auth";
import { login } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const user = await loginUser({ userName, password });
            dispatch(login({ user }));
            navigate("/home");
        } catch (error) {
            alert("Login failed: " + (error as any).response?.data?.message || "Unknown error");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <h1 className="font-black">LOG-IN YOURSELF :</h1>
            <Input placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin} className="w-full border-b-red ">Login</Button>
        </div>
    );
};

export default Login;
